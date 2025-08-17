const express = require('express');
const db = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Create job posting
router.post('/', authenticate, authorize(['recruiter']), async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      jobType,
      salaryMin,
      salaryMax,
      experienceRequired,
      skillsRequired,
      benefits,
      applicationDeadline
    } = req.body;

    const recruiterId = req.user.id;

    // Validation
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const result = await db.query(
      `INSERT INTO job_postings (
        recruiter_id, title, description, requirements, location, job_type,
        salary_min, salary_max, experience_required, skills_required, benefits, application_deadline
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`,
      [
        recruiterId, title, description, requirements, location, jobType,
        salaryMin, salaryMax, experienceRequired, skillsRequired, benefits,
        applicationDeadline
      ]
    );

    res.status(201).json({
      message: 'Job posting created successfully',
      job: result.rows[0]
    });
  } catch (error) {
    console.error('Job creation error:', error);
    res.status(500).json({ error: 'Failed to create job posting' });
  }
});

// Get all job postings (with search and filters)
router.get('/', async (req, res) => {
  try {
    const {
      q,
      location,
      jobType,
      salaryMin,
      salaryMax,
      skills,
      experience,
      page = 1,
      limit = 20,
      sortBy = 'created_at',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    let whereConditions = ['jp.is_active = true'];
    let queryParams = [];
    let paramIndex = 1;

    // Build search conditions
    if (q) {
      whereConditions.push(`(jp.title ILIKE $${paramIndex} OR jp.description ILIKE $${paramIndex} OR rp.company_name ILIKE $${paramIndex})`);
      queryParams.push(`%${q}%`);
      paramIndex++;
    }

    if (location) {
      whereConditions.push(`jp.location ILIKE $${paramIndex}`);
      queryParams.push(`%${location}%`);
      paramIndex++;
    }

    if (jobType) {
      whereConditions.push(`jp.job_type = $${paramIndex}`);
      queryParams.push(jobType);
      paramIndex++;
    }

    if (salaryMin) {
      whereConditions.push(`jp.salary_min >= $${paramIndex}`);
      queryParams.push(parseInt(salaryMin));
      paramIndex++;
    }

    if (salaryMax) {
      whereConditions.push(`jp.salary_max <= $${paramIndex}`);
      queryParams.push(parseInt(salaryMax));
      paramIndex++;
    }

    if (skills) {
      whereConditions.push(`jp.skills_required && $${paramIndex}`);
      queryParams.push(skills.split(','));
      paramIndex++;
    }

    if (experience) {
      whereConditions.push(`jp.experience_required ILIKE $${paramIndex}`);
      queryParams.push(`%${experience}%`);
      paramIndex++;
    }

    // Track search for analytics
    if (req.user && q) {
      await db.query(
        `INSERT INTO search_history (user_id, search_query, search_type, ip_address)
         VALUES ($1, $2, $3, $4)`,
        [req.user.id, q, 'job', req.ip]
      );
    }

    const searchQuery = `
      SELECT jp.*, 
             u.first_name, u.last_name, u.email,
             rp.company_name, rp.company_description, rp.logo_url,
             (SELECT COUNT(*) FROM job_applications WHERE job_id = jp.id) as application_count
      FROM job_postings jp
      JOIN users u ON jp.recruiter_id = u.id
      LEFT JOIN recruiter_profiles rp ON u.id = rp.user_id
      WHERE ${whereConditions.join(' AND ')}
      ORDER BY jp.${sortBy} ${sortOrder}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    queryParams.push(limit, offset);

    const result = await db.query(searchQuery, queryParams);

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total
      FROM job_postings jp
      JOIN users u ON jp.recruiter_id = u.id
      LEFT JOIN recruiter_profiles rp ON u.id = rp.user_id
      WHERE ${whereConditions.join(' AND ')}
    `;

    const countResult = await db.query(countQuery, queryParams.slice(0, -2));

    res.json({
      jobs: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.rows[0].total),
        pages: Math.ceil(countResult.rows[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Job search error:', error);
    res.status(500).json({ error: 'Failed to search jobs' });
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const jobId = req.params.id;

    // Increment view count
    await db.query(
      'UPDATE job_postings SET view_count = view_count + 1 WHERE id = $1',
      [jobId]
    );

    const result = await db.query(
      `SELECT jp.*, 
             u.first_name, u.last_name, u.email,
             rp.company_name, rp.company_description, rp.website, rp.logo_url, rp.company_size, rp.industry,
             (SELECT COUNT(*) FROM job_applications WHERE job_id = jp.id) as application_count
      FROM job_postings jp
      JOIN users u ON jp.recruiter_id = u.id
      LEFT JOIN recruiter_profiles rp ON u.id = rp.user_id
      WHERE jp.id = $1 AND jp.is_active = true`,
      [jobId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if current user has applied (if authenticated)
    let hasApplied = false;
    if (req.user && req.user.role === 'job_seeker') {
      const applicationResult = await db.query(
        'SELECT id FROM job_applications WHERE job_id = $1 AND job_seeker_id = $2',
        [jobId, req.user.id]
      );
      hasApplied = applicationResult.rows.length > 0;
    }

    res.json({
      job: result.rows[0],
      hasApplied
    });
  } catch (error) {
    console.error('Job fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// Update job posting
router.put('/:id', authenticate, authorize(['recruiter']), async (req, res) => {
  try {
    const jobId = req.params.id;
    const recruiterId = req.user.id;

    // Check if job belongs to recruiter
    const jobCheck = await db.query(
      'SELECT id FROM job_postings WHERE id = $1 AND recruiter_id = $2',
      [jobId, recruiterId]
    );

    if (jobCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found or unauthorized' });
    }

    const {
      title,
      description,
      requirements,
      location,
      jobType,
      salaryMin,
      salaryMax,
      experienceRequired,
      skillsRequired,
      benefits,
      applicationDeadline,
      isActive
    } = req.body;

    const result = await db.query(
      `UPDATE job_postings SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        requirements = COALESCE($3, requirements),
        location = COALESCE($4, location),
        job_type = COALESCE($5, job_type),
        salary_min = COALESCE($6, salary_min),
        salary_max = COALESCE($7, salary_max),
        experience_required = COALESCE($8, experience_required),
        skills_required = COALESCE($9, skills_required),
        benefits = COALESCE($10, benefits),
        application_deadline = COALESCE($11, application_deadline),
        is_active = COALESCE($12, is_active),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $13 AND recruiter_id = $14
      RETURNING *`,
      [
        title, description, requirements, location, jobType,
        salaryMin, salaryMax, experienceRequired, skillsRequired,
        benefits, applicationDeadline, isActive, jobId, recruiterId
      ]
    );

    res.json({
      message: 'Job updated successfully',
      job: result.rows[0]
    });
  } catch (error) {
    console.error('Job update error:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// Delete job posting
router.delete('/:id', authenticate, authorize(['recruiter']), async (req, res) => {
  try {
    const jobId = req.params.id;
    const recruiterId = req.user.id;

    const result = await db.query(
      'UPDATE job_postings SET is_active = false WHERE id = $1 AND recruiter_id = $2 RETURNING id',
      [jobId, recruiterId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found or unauthorized' });
    }

    res.json({ message: 'Job deactivated successfully' });
  } catch (error) {
    console.error('Job deletion error:', error);
    res.status(500).json({ error: 'Failed to deactivate job' });
  }
});

// Get recruiter's jobs
router.get('/recruiter/my-jobs', authenticate, authorize(['recruiter']), async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const { page = 1, limit = 20, status = 'all' } = req.query;
    const offset = (page - 1) * limit;

    let whereCondition = 'recruiter_id = $1';
    let queryParams = [recruiterId];

    if (status === 'active') {
      whereCondition += ' AND is_active = true';
    } else if (status === 'inactive') {
      whereCondition += ' AND is_active = false';
    }

    const result = await db.query(
      `SELECT jp.*,
             (SELECT COUNT(*) FROM job_applications WHERE job_id = jp.id) as application_count,
             (SELECT COUNT(*) FROM job_applications WHERE job_id = jp.id AND status = 'pending') as pending_applications
      FROM job_postings jp
      WHERE ${whereCondition}
      ORDER BY jp.created_at DESC
      LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`,
      [...queryParams, limit, offset]
    );

    // Get total count
    const countResult = await db.query(
      `SELECT COUNT(*) as total FROM job_postings WHERE ${whereCondition}`,
      queryParams
    );

    res.json({
      jobs: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.rows[0].total),
        pages: Math.ceil(countResult.rows[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Recruiter jobs fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Save/unsave job (for job seekers)
router.post('/:id/save', authenticate, authorize(['job_seeker']), async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobSeekerId = req.user.id;

    // Check if job exists
    const jobCheck = await db.query(
      'SELECT id FROM job_postings WHERE id = $1 AND is_active = true',
      [jobId]
    );

    if (jobCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if already saved
    const existingSave = await db.query(
      'SELECT id FROM saved_jobs WHERE job_seeker_id = $1 AND job_id = $2',
      [jobSeekerId, jobId]
    );

    if (existingSave.rows.length > 0) {
      // Unsave
      await db.query(
        'DELETE FROM saved_jobs WHERE job_seeker_id = $1 AND job_id = $2',
        [jobSeekerId, jobId]
      );
      res.json({ message: 'Job unsaved successfully', saved: false });
    } else {
      // Save
      await db.query(
        'INSERT INTO saved_jobs (job_seeker_id, job_id) VALUES ($1, $2)',
        [jobSeekerId, jobId]
      );
      res.json({ message: 'Job saved successfully', saved: true });
    }
  } catch (error) {
    console.error('Save job error:', error);
    res.status(500).json({ error: 'Failed to save/unsave job' });
  }
});

// Get saved jobs (for job seekers)
router.get('/saved/my-saved', authenticate, authorize(['job_seeker']), async (req, res) => {
  try {
    const jobSeekerId = req.user.id;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const result = await db.query(
      `SELECT jp.*, sj.saved_at,
             u.first_name, u.last_name,
             rp.company_name, rp.logo_url
      FROM saved_jobs sj
      JOIN job_postings jp ON sj.job_id = jp.id
      JOIN users u ON jp.recruiter_id = u.id
      LEFT JOIN recruiter_profiles rp ON u.id = rp.user_id
      WHERE sj.job_seeker_id = $1 AND jp.is_active = true
      ORDER BY sj.saved_at DESC
      LIMIT $2 OFFSET $3`,
      [jobSeekerId, limit, offset]
    );

    // Get total count
    const countResult = await db.query(
      `SELECT COUNT(*) as total
      FROM saved_jobs sj
      JOIN job_postings jp ON sj.job_id = jp.id
      WHERE sj.job_seeker_id = $1 AND jp.is_active = true`,
      [jobSeekerId]
    );

    res.json({
      savedJobs: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.rows[0].total),
        pages: Math.ceil(countResult.rows[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Saved jobs fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch saved jobs' });
  }
});

module.exports = router;
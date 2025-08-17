const express = require('express');
const db = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// === 1. Job Seeker Applies ===
router.post('/', authenticate, authorize(['job_seeker']), async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    const jobSeekerId = req.user.id;

    if (!jobId) return res.status(400).json({ error: 'Job ID is required' });

    const jobCheck = await db.query(
      `SELECT * FROM job_postings WHERE id = $1 AND is_active = true`,
      [jobId]
    );

    if (jobCheck.rows.length === 0)
      return res.status(404).json({ error: 'Job not found or inactive' });

    const job = jobCheck.rows[0];

    if (job.application_deadline && new Date(job.application_deadline) < new Date()) {
      return res.status(400).json({ error: 'Deadline has passed' });
    }

    const alreadyApplied = await db.query(
      'SELECT id FROM job_applications WHERE job_id = $1 AND job_seeker_id = $2',
      [jobId, jobSeekerId]
    );

    if (alreadyApplied.rows.length > 0)
      return res.status(409).json({ error: 'Already applied' });

    const result = await db.query(
      `INSERT INTO job_applications (job_id, job_seeker_id, cover_letter)
       VALUES ($1, $2, $3) RETURNING *`,
      [jobId, jobSeekerId, coverLetter]
    );

    res.status(201).json({ message: 'Application submitted', application: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Submission failed' });
  }
});

// === 2. Job Seeker Views Their Applications ===
router.get('/my-applications', authenticate, authorize(['job_seeker']), async (req, res) => {
  try {
    const jobSeekerId = req.user.id;
    const { page = 1, limit = 20, status } = req.query;
    const offset = (page - 1) * limit;

    let where = 'ja.job_seeker_id = $1';
    const params = [jobSeekerId];

    if (status) {
      where += ' AND ja.status = $2';
      params.push(status);
    }

    const apps = await db.query(
      `SELECT ja.*, jp.title, rp.company_name
       FROM job_applications ja
       JOIN job_postings jp ON ja.job_id = jp.id
       LEFT JOIN recruiter_profiles rp ON jp.recruiter_id = rp.user_id
       WHERE ${where}
       ORDER BY ja.applied_at DESC
       LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limit, offset]
    );

    const count = await db.query(
      `SELECT COUNT(*) FROM job_applications ja
       JOIN job_postings jp ON ja.job_id = jp.id
       WHERE ${where}`,
      params
    );

    res.json({
      applications: apps.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(count.rows[0].count),
        pages: Math.ceil(count.rows[0].count / limit)
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fetch failed' });
  }
});

// === 3. Recruiter Views Applicants for a Job ===
router.get('/job/:jobId', authenticate, authorize(['recruiter']), async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const recruiterId = req.user.id;
    const { page = 1, limit = 20, status } = req.query;
    const offset = (page - 1) * limit;

    const jobCheck = await db.query(
      'SELECT id FROM job_postings WHERE id = $1 AND recruiter_id = $2',
      [jobId, recruiterId]
    );
    if (jobCheck.rows.length === 0)
      return res.status(404).json({ error: 'Unauthorized or job not found' });

    let where = 'ja.job_id = $1';
    const params = [jobId];
    if (status) {
      where += ' AND ja.status = $2';
      params.push(status);
    }

    const result = await db.query(
      `SELECT ja.*, u.first_name, u.last_name, jsp.title as job_seeker_title
       FROM job_applications ja
       JOIN users u ON ja.job_seeker_id = u.id
       LEFT JOIN job_seeker_profiles jsp ON u.id = jsp.user_id
       WHERE ${where}
       ORDER BY ja.applied_at DESC
       LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limit, offset]
    );

    const count = await db.query(
      `SELECT COUNT(*) FROM job_applications ja WHERE ${where}`,
      params
    );

    res.json({
      applicants: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(count.rows[0].count),
        pages: Math.ceil(count.rows[0].count / limit)
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch applicants' });
  }
});

// === 4. Recruiter Updates Application Status (Accept/Reject) ===
router.patch('/status/:applicationId', authenticate, authorize(['recruiter']), async (req, res) => {
  try {
    const applicationId = req.params.applicationId;
    const { status } = req.body;
    const validStatuses = ['accepted', 'rejected'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Check if recruiter owns the job
    const check = await db.query(
      `SELECT ja.*, jp.recruiter_id, u.email 
       FROM job_applications ja
       JOIN job_postings jp ON ja.job_id = jp.id
       JOIN users u ON ja.job_seeker_id = u.id
       WHERE ja.id = $1`,
      [applicationId]
    );

    if (check.rows.length === 0)
      return res.status(404).json({ error: 'Application not found' });

    const app = check.rows[0];

    if (app.recruiter_id !== req.user.id)
      return res.status(403).json({ error: 'Not authorized' });

    const update = await db.query(
      `UPDATE job_applications SET status = $1 WHERE id = $2 RETURNING *`,
      [status, applicationId]
    );

    // Notification Mock
    console.log(`📩 Notify ${app.email}: Your application has been ${status.toUpperCase()}.`);

    res.json({ message: `Application ${status}`, application: update.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// === 5. Admin Views All Applications ===
router.get('/admin/all', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    const result = await db.query(
      `SELECT ja.*, u.first_name, u.last_name, jp.title, rp.company_name
       FROM job_applications ja
       JOIN users u ON ja.job_seeker_id = u.id
       JOIN job_postings jp ON ja.job_id = jp.id
       LEFT JOIN recruiter_profiles rp ON jp.recruiter_id = rp.user_id
       ORDER BY ja.applied_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const count = await db.query(`SELECT COUNT(*) FROM job_applications`);

    res.json({
      applications: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(count.rows[0].count),
        pages: Math.ceil(count.rows[0].count / limit)
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch all applications' });
  }
});

module.exports = router;

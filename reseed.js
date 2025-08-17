const db = require('../db');

async function reseed() {
  try {
    console.log('Starting reseed...');

    // 1. Delete existing data in proper order
    await db.query('DELETE FROM jobs');
    await db.query('DELETE FROM recruiter_profiles');
    await db.query('DELETE FROM users');

    console.log('Old data deleted.');

    // 2. Insert dummy users
    await db.query(`
      INSERT INTO users (email, password, role)
      VALUES
        ('seeker1@example.com', 'hashedpass1', 'job_seeker'),
        ('recruiter1@example.com', 'hashedpass2', 'recruiter')
    `);

    // 3. Insert recruiter profile
    await db.query(`
      INSERT INTO recruiter_profiles (user_id, company_name)
      SELECT id, 'Winnicode Corp'
      FROM users WHERE email = 'recruiter1@example.com'
    `);

    // 4. Insert dummy job
    await db.query(`
      INSERT INTO jobs (recruiter_id, title, description, location)
      SELECT id, 'Frontend Developer', 'Build React apps', 'Jakarta'
      FROM users WHERE email = 'recruiter1@example.com'
    `);

    console.log('New dummy data inserted successfully.');

  } catch (err) {
    console.error('Reseeding error:', err);
  } finally {
    const { pool } = require('../db');
    await pool.end();
  }
}

reseed();

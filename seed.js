const db = require('../db');

async function seed() {
  try {
    // Dummy users
    await db.query(`
        INSERT INTO users (email, password, role)
        VALUES
            ('seeker1@example.com', 'hashedpass1', 'job_seeker'),
            ('recruiter1@example.com', 'hashedpass2', 'recruiter')
        ON CONFLICT (email) DO NOTHING
    `);

    // Dummy recruiter profile
    await db.query(`
      INSERT INTO recruiter_profiles (user_id, company_name)
      SELECT id, 'Winnicode Corp'
      FROM users WHERE email = 'recruiter1@example.com'
    `);

    // Dummy job
    await db.query(`
      INSERT INTO jobs (recruiter_id, title, description, location)
      SELECT u.id, 'Frontend Developer', 'Build React apps', 'Jakarta'
      FROM users u WHERE u.email = 'recruiter1@example.com'
    `);

    console.log('Seed data inserted successfully');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    const { pool } = require('../db/index.js');
    await pool.end(); // ✅ This closes the connection pool

  }
}

seed();

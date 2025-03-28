const pool = require("../config/dbConfig");

const Resume = {
  // Create a new resume
  async create({ name, email, summary }) {
    const result = await pool.query(
      "INSERT INTO resumes (name, email, summary) VALUES ($1, $2, $3) RETURNING *",
      [name, email, summary]
    );
    return result.rows[0];
  },

  // Retrieve the most recent resume
  async getLatest() {
    const result = await pool.query(
      "SELECT * FROM resumes ORDER BY created_at DESC LIMIT 1"
    );
    return result.rows[0];
  },
};

module.exports = Resume;

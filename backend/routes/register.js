

import express from 'express';
import pool from '../config/config.js';
const router = express.Router();
router.use(express.json());

router.post('/register', async (req, res) => {
    const { email, name, event_id } = req.body;
  
    if (!email || !name || !event_id) {
      return res.status(400).json({ error: 'Email, name, and event ID are required' });
    }
  
    try {
      // Begin transaction
      await pool.query('BEGIN');
  
      // Check if the user exists by email
      let userResult = await pool.query('SELECT email FROM users WHERE email = $1', [email]);
  
      if (userResult.rows.length === 0) {
        // If user does not exist, insert them into the users table
        const insertUserQuery = `
          INSERT INTO users (email, full_name)
          VALUES ($1, $2)
          RETURNING email;
        `;
        await pool.query(insertUserQuery, [email, name]);
      }
  
      // Check if the event exists
      const eventResult = await pool.query('SELECT event_id FROM events WHERE event_id = $1', [event_id]);
      if (eventResult.rows.length === 0) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      // Register the user for the event (using email as foreign key)
      const insertRegistrationQuery = `
        INSERT INTO registrations (user_email, event_id)
        VALUES ($1, $2);
      `;
      await pool.query(insertRegistrationQuery, [email, event_id]);
  
      // Commit transaction
      await pool.query('COMMIT');
  
      res.status(201).json({ message: 'User successfully registered for the event' });
  
    } catch (error) {
      // If there is any error, rollback the transaction
      await pool.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  export default router

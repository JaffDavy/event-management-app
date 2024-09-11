import express from 'express';
import pool from '../config/config.js';
const router = express.Router();

// Route to retrieve tickets by user email
router.get('/tickets/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Fetch user_id from the users table using the email
    const userResult = await pool.query('SELECT id FROM users WHERE email = $1', [email]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const userId = userResult.rows[0].id;

    // Retrieve tickets with event details
    const ticketQuery = `
      SELECT
        t.ticket_number,
        e.eventtitle AS event_name,
        t.status,
        u.email,
        u.full_name
      FROM tickets t
      JOIN users u ON u.id = t.user_id
      JOIN events e ON e.event_id = t.event_id
      WHERE t.user_id = $1;
    `;
    const ticketResult = await pool.query(ticketQuery, [userId]);

    if (ticketResult.rows.length === 0) {
      return res.status(404).json({ message: 'No tickets found for this user.' });
    }

    res.status(200).json(ticketResult.rows);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Failed to retrieve tickets' });
  }
});

export default router;

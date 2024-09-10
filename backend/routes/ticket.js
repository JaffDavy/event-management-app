import express from 'express';
import pool from '../config/config.js';
const router = express.Router();
router.use(express.json());

router.get('/:email', async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Retrieve tickets for the user
    const ticketsResult = await pool.query(
      'SELECT t.ticket_number, e.eventtitle, t.status FROM tickets t JOIN events e ON t.event_id = e.event_id WHERE t.user_id = (SELECT user_id FROM users WHERE email = $1)',
      [email]
    );

    if (ticketsResult.rows.length === 0) {
      return res.status(404).json({ error: 'No tickets found for this email' });
    }

    // Send the tickets as the response
    res.status(200).json({ tickets: ticketsResult.rows });
  } catch (error) {
    console.error('Error retrieving tickets:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

export default router;

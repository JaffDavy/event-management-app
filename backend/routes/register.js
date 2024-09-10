import express from 'express';
import pool from '../config/config.js';
const router = express.Router();
router.use(express.json());

router.post('/register', async (req, res) => {
  const { email, name, eventtitle } = req.body;

  if (!email || !name || !eventtitle) {
    return res.status(400).json({ error: 'Email, name, and event title are required' });
  }

  try {
    // Begin transaction
    await pool.query('BEGIN');
    console.log('Transaction started.');

    // Check if the user exists by email
    let userResult = await pool.query('SELECT email FROM registration WHERE email = $1', [email]);

    if (userResult.rows.length === 0) {
      // If user does not exist, insert them into the users table
      const insertUserQuery = `
        INSERT INTO registration (email, full_name)
        VALUES ($1, $2)
        RETURNING email;
      `;
      await pool.query(insertUserQuery, [email, name]);
      console.log('New user inserted.');
    } else {
      console.log('User already exists.');
    }

    // Get event_id, start_date, and end_date based on eventtitle
    const eventResult = await pool.query('SELECT eventid, start_date, end_date FROM events WHERE eventtitle = $1', [eventtitle]);

    if (eventResult.rows.length === 0) {
      console.log('Event not found.');
      return res.status(404).json({ error: 'Event not found' });
    }

    const { eventid, start_date, end_date } = eventResult.rows[0]; // Extract event details
    console.log('Event found:', { eventid, start_date, end_date });

    // Convert start_date and end_date to Date objects for comparison
    const currentDate = new Date();
    const eventStartDate = new Date(start_date);
    const eventEndDate = new Date(end_date);

    // Check if the current date is before the event's start date or after its end date
    if (currentDate > eventEndDate) {
      console.log('Event has already passed.');
      return res.status(400).json({ error: 'You cannot register for an event that has already passed' });
    }

    // Check if the user is already registered for the event
     registrationResult = await pool.query(
      'SELECT * FROM registrations WHERE user_email = $1 AND eventid = $2',
      [email, eventid]
    );

    if (registrationResult.rows.length > 0) {
      console.log('User already registered for this event.');
      return res.status(400).json({ error: 'You are already registered for this event' });
    }

    // Register the user for the event (using email as foreign key)
    const insertRegistrationQuery = `
      INSERT INTO registrations (user_email, eventid)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const registrationResult = await pool.query(insertRegistrationQuery, [email, eventid]);
    console.log('User registered for event.');

    // Generate a ticket for the user
    const insertTicketQuery = `
      INSERT INTO tickets (eventid, user_email, status)
      VALUES ($1, $2, 'Accepted')
      RETURNING *;
    `;
    const ticketResult = await pool.query(insertTicketQuery, [eventid, email]);
    console.log('Ticket generated:', ticketResult.rows[0]);

    // Commit transaction
    await pool.query('COMMIT');
    console.log('Transaction committed.');

    res.status(201).json({ 
      message: 'User successfully registered for the event',
      ticket: ticketResult.rows[0]  // Include ticket details in the response
    });

  } catch (error) {
    // If there is any error, rollback the transaction
    await pool.query('ROLLBACK');
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

export default router;

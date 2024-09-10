import express from 'express';
import pool from "../config/config.js";


const router = express.Router();
router.use(express.json());




// Create a ticket
router.post('/tickets', async (req, res, next) => {
    try {
        const { event_id, user_id, ticket_number, seat_number } = req.body;
        console.log(req.body)
        if (!event_id || !user_id || !ticket_number) {
            return res.status(400).json({ error: 'Event ID, User ID, and Ticket Number are required' });
        }

        // Check if the event exists
        const eventCheck = await pool.query('SELECT * FROM events WHERE event_id = $1', [event_id]);
        if (eventCheck.rows.length === 0) {
            return res.status(400).json({ error: 'Event not found' });
        }

        // Create the ticket
        const result = await pool.query(
            'INSERT INTO tickets (event_id, user_id, ticket_number, seat_number) VALUES ($1, $2, $3, $4) RETURNING *',
            [event_id, user_id, ticket_number, seat_number]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});


// Get tickets by event ID
router.get('/tickets/:event_id', async (req, res, next) => {
    try {
        const event_id = parseInt(req.params.event_id);
        if (isNaN(event_id)) {
            return res.status(400).json({ error: 'Invalid event ID' });
        }

        const result = await pool.query('SELECT * FROM tickets WHERE event_id = $1', [event_id]);
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
});
;

// Get a ticket by ticket number
router.get('/ticket/:ticket_number', async (req, res, next) => {
    try {
        const { ticket_number } = req.params;
        const result = await pool.query('SELECT * FROM tickets WHERE ticket_number = $1', [ticket_number]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});


// Update ticket status
router.patch('/ticket/:ticket_number/status', async (req, res, next) => {
    try {
        const { ticket_number } = req.params;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        const result = await pool.query(
            'UPDATE tickets SET status = $1 WHERE ticket_number = $2 RETURNING *',
            [status, ticket_number]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});


export default router;
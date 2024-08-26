import express from 'express';
import pool from '../config/config.js';

const router = express.Router();
router.use(express.json());

// Create an event
router.post('/events', async (req, res, next) => {
    try {
        const { title, summary, date, location, status } = req.body;

        if (!title || !summary || !date || !location) {
            return res.status(400).json({ error: 'Event title, summary, date, and location are required' });
        }

        const result = await pool.query(
            'INSERT INTO Events (EventTitle, EventSummary, EventDate, EventLocation, Status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, summary, date, location, status || 'pending'] // Default status to 'pending' if not provided
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});


// Get all events
router.get('/events', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM Events');
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
});

// Get event by ID
router.get('/events/:id', async (req, res, next) => {
    try {
        const eventId = parseInt(req.params.id, 10);

        if (isNaN(eventId)) {
            return res.status(404).send('Event not found');
        }

        const result = await pool.query('SELECT * FROM Events WHERE EventID = $1', [eventId]);

        if (result.rows.length === 0) {
            return res.status(404).send('Event not found');
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Update an event
router.put('/events/:id', async (req, res, next) => {
    try {
        const eventId = parseInt(req.params.id, 10);
        const { title, summary, date, location } = req.body;

        if (isNaN(eventId)) {
            return res.status(400).json({ error: 'Invalid event ID' });
        }

        const result = await pool.query(
            'UPDATE Events SET EventTitle = $1, EventSummary = $2, EventDate = $3, EventLocation = $4 WHERE EventID = $5 RETURNING *',
            [title, summary, date, location, eventId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// Delete an event
router.delete('/events/:id', async (req, res, next) => {
    try {
        const eventId = parseInt(req.params.id, 10);

        if (isNaN(eventId)) {
            return res.status(400).json({ error: 'Invalid event ID' });
        }

        const result = await pool.query('DELETE FROM Events WHERE EventID = $1 RETURNING *', [eventId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

// Get event by ID for invite
router.get('/event-invite/:id', async (req, res) => {
    try {
        const eventId = parseInt(req.params.id, 10);

        if (isNaN(eventId)) {
            return res.status(404).send('Event not found');
        }

        const result = await pool.query('SELECT * FROM Events WHERE EventID = $1', [eventId]);

        if (result.rows.length === 0) {
            return res.status(404).send('Event not found');
        }

        const event = result.rows[0];

        res.json({
            message: `You have been invited to ${event.EventTitle}!`,
            eventDetails: event
        });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Attend event
router.post('/events/:id/attend', async (req, res) => {
    try {
        const eventId = parseInt(req.params.id, 10);

        if (isNaN(eventId)) {
            return res.status(400).json({ error: 'Invalid event ID' });
        }

        const result = await pool.query(
            'UPDATE Events SET accept = accept + 1 WHERE EventID = $1 RETURNING *',
            [eventId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json({ msg: 'Attendance marked', attendance: result.rows[0].attendance });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Server error');
    }
});

// Decline event attendance
router.post('/events/:id/decline', async (req, res) => {
    try {
        const eventId = parseInt(req.params.id, 10);

        if (isNaN(eventId)) {
            return res.status(400).json({ error: 'Invalid event ID' });
        }

        const result = await pool.query(
            'UPDATE Events SET Declined = COALESCE(Declined, 0) + 1 WHERE EventID = $1 RETURNING *',
            [eventId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json({ msg: 'Attendance declined', declined: result.rows[0].declined });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.get('/events/accepted-events', async (req, res) => {
    const userId = req.user.id; // Ensure req.user is correctly populated
    try {
        const result = await pool.query(
            'SELECT * FROM Events WHERE UserID = $1 AND Status = $2', 
            [userId, 'accepted']
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching accepted events:', error);
        res.status(500).send('Server error');
    }
});


export default router;

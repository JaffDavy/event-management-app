import express from 'express';
import pool from '../config/config.js';

const router = express.Router();
router.use(express.json());

// Create an event
router.post('/events', async (req, res, next) => {
    try {
        const { title, summary, date, location } = req.body;

        if (!title || !summary || !date || !location) {
            return res.status(400).json({ error: 'Event title, summary, date, and location are required' });
        }

        const result = await pool.query(
            'INSERT INTO Events (EventTitle, EventSummary, EventDate, EventLocation) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, summary, date, location]
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

// Update an event
router.put('/events/:id', async (req, res, next) => {
    try {
        const eventId = parseInt(req.params.id);
        const { title, summary, date, location } = req.body;

        if (isNaN(eventId)) {
            return res.status(404).json({ error: 'Event not found' });
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
        const eventId = parseInt(req.params.id);

        if (isNaN(eventId)) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const result = await pool.query('DELETE FROM Events WHERE EventID = $1 RETURNING *', [eventId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(204).send();  // Sending a 204 No Content status on successful deletion
    } catch (error) {
        next(error);
    }
});

export default router;

import express from 'express';
import pool from "../config/config.js";

const router = express.Router();
router.use(express.json());

// Create an event
router.post('/events', async (req, res, next) => {
    try {
        const { event_name, location, date, time, description } = req.body;
        if (!event_name || !location || !date || !time) {
            return res.status(400).json({ error: 'Event name, location, date, and time are required' });
        }
        const result = await pool.query(
            'INSERT INTO events (event_name, location, date, time, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [event_name, location, date, time, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// Get all events
router.get('/events', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM events');
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
});

// Update an event
router.put('/events/:id', async (req, res, next) => {
    try {
        const eventId = parseInt(req.params.id);
        const { event_name, location, date, time, description } = req.body;
        if (isNaN(eventId)) {
            return res.status(404).json({ error: 'Event not found' });
        }
        const result = await pool.query(
            'UPDATE events SET event_name = $1, location = $2, date = $3, time = $4, description = $5 WHERE id = $6 RETURNING *',
            [event_name, location, date, time, description, eventId]
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
        const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [eventId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;

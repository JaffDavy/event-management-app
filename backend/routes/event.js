import express from 'express';
import pool from '../config/config.js';

const router = express.Router();
router.use(express.json());

// Utility function to validate if a category exists
const validateCategory = async (category_id) => {
    try {
        const category = await pool.query('SELECT id FROM Categories WHERE id = $1', [category_id]);
        return category.rows.length > 0;
    } catch (error) {
        console.error('Error validating category:', error.message);
        throw error;
    }
};

// Create an event
router.post('/events', async (req, res, next) => {
    try {
        const { eventtitle, eventsummary, start_date, end_date, eventlocation, category_id, capacity } = req.body;

        if (!eventtitle || !eventsummary || !start_date || !end_date || !eventlocation || !category_id || capacity == null) {
            return res.status(400).json({ error: 'All event fields, including capacity, are required' });
        }

        if (isNaN(capacity) || capacity < 1) {
            return res.status(400).json({ error: 'Capacity must be a positive integer' });
        }

        // Validate category
        const categoryExists = await validateCategory(category_id);
        if (!categoryExists) {
            return res.status(400).json({ error: 'Invalid category_id' });
        }

        const result = await pool.query(
            'INSERT INTO Events (eventtitle, eventsummary, start_date, end_date, eventlocation, category_id, capacity) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [eventtitle, eventsummary, start_date, end_date, eventlocation, category_id, capacity]
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
        console.error('Error fetching events:', error.message);
        res.status(500).send('Server error');
    }
});

// Get event by ID
router.get('/events/:id', async (req, res, next) => {
    try {
        const eventId = parseInt(req.params.id, 10);

        if (isNaN(eventId)) {
            return res.status(400).send('Invalid Event ID');
        }

        const result = await pool.query('SELECT * FROM Events WHERE EventID = $1', [eventId]);

        if (result.rows.length === 0) {
            return res.status(404).send('Event not found');
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching event by ID:', error.message);
        res.status(500).send('Server error');
    }
});

// Update an event
router.put('/events/:id', async (req, res, next) => {
    try {
        const eventId = parseInt(req.params.id, 10);
        const { title, summary, start_day, end_day, location, category_id, capacity } = req.body;

        if (isNaN(eventId)) {
            return res.status(400).json({ error: 'Invalid event ID' });
        }

        if (capacity != null && (isNaN(capacity) || capacity < 1)) {
            return res.status(400).json({ error: 'Capacity must be a positive integer' });
        }

        if (category_id) {
            const categoryExists = await validateCategory(category_id);
            if (!categoryExists) {
                return res.status(400).json({ error: 'Invalid category_id' });
            }
        }

        const result = await pool.query(
            'UPDATE Events SET title = $1, summary = $2, start_day = $3, end_day = $4, location = $5, category_id = $6, capacity = $7 WHERE EventID = $8 RETURNING *',
            [title, summary, start_day, end_day, location, category_id, capacity, eventId]
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

// Get events by category name
router.get('/category/:categoryName', async (req, res, next) => {
    try {
        const { categoryName } = req.params;

        const result = await pool.query(
            `SELECT e.*, c.name as category_name 
             FROM Events e
             JOIN Categories c ON e.category_id = c.id
             WHERE c.name = $1`,
            [categoryName]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No events found for this category' });
        }

        res.json(result.rows);
    } catch (error) {
        console.error('Error in /category/:categoryName GET:', error.message);
        next(error);
    }
});

// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Categories');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






export default router;

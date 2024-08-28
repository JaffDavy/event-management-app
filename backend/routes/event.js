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
        const { title, summary, date, location, category_id } = req.body;

        if (!title || !summary || !date || !location || !category_id) {
            return res.status(400).json({ error: 'Event title, summary, date, location, and category_id are required' });
        }

        // Validate category before creating event
        const categoryExists = await validateCategory(category_id);
        if (!categoryExists) {
            return res.status(400).json({ error: 'Invalid category_id' });
        }

        const result = await pool.query(
            'INSERT INTO Events (EventTitle, EventSummary, EventDate, EventLocation, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, summary, date, location, category_id]
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
        const { title, summary, date, location, category_id } = req.body;

        if (isNaN(eventId)) {
            return res.status(400).json({ error: 'Invalid event ID' });
        }

        // Validate category if provided
        if (category_id) {
            const categoryExists = await validateCategory(category_id);
            if (!categoryExists) {
                return res.status(400).json({ error: 'Invalid category_id' });
            }
        }

        const result = await pool.query(
            'UPDATE Events SET EventTitle = $1, EventSummary = $2, EventDate = $3, EventLocation = $4, category_id = $5 WHERE EventID = $6 RETURNING *',
            [title, summary, date, location, category_id, eventId]
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

// Mark attendance for an event
router.post('/events/:id/attend', async (req, res) => {
    try {
        const eventId = parseInt(req.params.id, 10);

        if (isNaN(eventId)) {
            return res.status(400).json({ error: 'Invalid event ID' });
        }

        const result = await pool.query(
            'UPDATE Events SET Attendance = COALESCE(Attendance, 0) + 1 WHERE EventID = $1 RETURNING *',
            [eventId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json({ msg: 'Attendance marked', attendance: result.rows[0].attendance });
    } catch (error) {
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

// Route to get events by category name
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

// Route to get all categories
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
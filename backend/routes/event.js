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

// Mark attendance for an event
router.post('/events/:id/attend', async (req, res) => {
    try {
        const eventId = parseInt(req.params.id, 10);

        if (isNaN(eventId)) {
            return res.status(400).json({ error: 'Invalid event ID' });
        }

        const result = await pool.query(
            'UPDATE Events SET Attendance = Attendance + 1 WHERE EventID = $1 RETURNING *',
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
    
    // Query to select events by category name
    const result = await pool.query(
      `SELECT * FROM Events WHERE CategoryID = (SELECT id FROM Categories WHERE name = $1)`,
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
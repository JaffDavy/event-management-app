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



router.post('/registrations', async (req, res, next) => {
    try {
        const { user_id, eventid } = req.body;
        if (!user_id || !eventid) {
            return res.status(400).json({ error: 'User ID and Event ID are required' });
        }
        // Check if the event exists and get its details
        const eventCheck = await pool.query(
            'SELECT "start_date", "end_date", "capacity" FROM "events" WHERE "event_id" = $1',
            [eventid]
        );
        if (eventCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        const startDate = new Date(eventCheck.rows[0].start_date);
        const endDate = new Date(eventCheck.rows[0].end_date);
        const currentDate = new Date();
        const capacity = eventCheck.rows[0].capacity;
        // Check if the event has already passed
        if (currentDate > endDate) {
            return res.status(400).json({ error: 'Cannot register for past events' });
        }
        // Check if it's within 24 hours of the event
        const registrationCutoff = new Date(startDate.getTime() - 24 * 60 * 60 * 1000);
        if (currentDate > registrationCutoff) {
            return res.status(400).json({ error: 'Registration is closed for this event' });
        }
        // Check if the event is already at capacity
        const registrationCount = await pool.query(
            'SELECT COUNT(*) FROM "registrations" WHERE "event_id" = $1 AND "status" = $2',
            [event_id, 'registered']
        );
        if (parseInt(registrationCount.rows[0].count, 10) >= capacity) {
            return res.status(400).json({ error: 'Event is already at full capacity' });
        }
        // If all checks pass, proceed with registration
        const result = await pool.query(
            'INSERT INTO "registrations" ("user_id", "eventid", "status") VALUES ($1, $2, $3) RETURNING *',
            [user_id, eventid, 'registered']
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
})

export default router;

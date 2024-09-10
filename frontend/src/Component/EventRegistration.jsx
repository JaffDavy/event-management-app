import React, { useState, useEffect } from 'react';

const EventRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventtitle: '', // Correct field for event title
  });

  const [message, setMessage] = useState('');
  const [events, setEvents] = useState([]);

  // Fetch events when component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/event/events'); // Adjust endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setMessage('Failed to fetch events.');
      }
    };

    fetchEvents();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register/register', { // Adjust endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(`Successfully registered! Ticket Number: ${result.ticket.ticket_number}`);
        setFormData({
          name: '',
          email: '',
          eventtitle: '',
        });
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setMessage('Error: Could not connect to the server.');
    }
  };

  return (
    <div>
      <h1>Register for an Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="eventtitle">Select Event:</label>
          <select
            id="eventtitle"
            name="eventtitle"
            value={formData.eventtitle}
            onChange={handleChange}
            required
          >
            <option value="">Select an event</option>
            {events.map((event) => (
              <option key={event.event_id} value={event.eventtitle}>
                {event.eventtitle} {/* Ensure this matches your event data */}
              </option>
            ))}
          </select>
        </div>
        
        <button type="submit">Register</button>
      </form>
      
      {message && <p>{message}</p>}
    </div>
  );
};

export default EventRegistration;

import React, { useState, useEffect } from 'react';

const EventRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    event_id: '', 
  });

  const [message, setMessage] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/event/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Successfully registered for the event!');
        setFormData({
          name: '',
          email: '',
          event_id: '',
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
          <label htmlFor="event_id">Select Event:</label>
          <select
            id="event_id"
            name="event_id"
            value={formData.event_id}
            onChange={handleChange}
            required
          >
            <option value="">Select an event</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.eventtitle} {/* Make sure this field matches the backend */}
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

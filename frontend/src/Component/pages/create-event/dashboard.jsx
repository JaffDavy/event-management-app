 import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';

function EventDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events'); // Adjust the endpoint as needed
        setEvents(response.data);
      } catch (error) {
        setError('Error fetching events');
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleViewEvent = (eventId) => {
    navigate(`/event/${eventId}`);
  }; 

  const handleEditEvent = (eventId) => {
    navigate(`/event-form/${eventId}`); // Adjust this route to match your edit form route
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/events/${eventId}`);
      setEvents(events.filter(event => event.EventID !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Failed to delete event');
    }
  };

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="event-dashboard">
      <h2>Event Dashboard</h2>
      <button onClick={handleCreateEvent} className="create-event-button">Create New Event</button>
      {events.length > 0 ? (
        <div className="event-list">
          {events.map(event => (
            <div key={event.EventID} className="event-item">
              <h3>{event.EventTitle || 'No title provided'}</h3>
              <p>{event.EventSummary || 'No summary provided'}</p>
              <p>Date: {new Date(event.EventDate).toLocaleDateString()}</p>
              <p>Location: {event.EventLocation || 'Location not provided'}</p>
              <div className="event-actions">
                <button onClick={() => handleViewEvent(event.EventID)}>View</button>
                <button onClick={() => handleEditEvent(event.EventID)}>Edit</button>
                <button onClick={() => handleDeleteEvent(event.EventID)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No events available</p>
      )}
    </div>
  );
}

export default EventDashboard;

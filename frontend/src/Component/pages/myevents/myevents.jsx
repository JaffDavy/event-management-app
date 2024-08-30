import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './myevents.css';

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events/my-events'); // Adjust the endpoint as needed
        setEvents(response.data);
      } catch (error) {
        setError('Error fetching your events');
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  const handleViewEvent = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const handleEditEvent = (eventId) => {
    navigate(`/event-form/${eventId}`);
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

  if (loading) {
    return <div>Loading your events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="my-events-page">
      <h2>My Events</h2>
      {events.length > 0 ? (
        <div className="my-events-list">
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
        <p>You have not created any events.</p>
      )}
    </div>
  );
}

export default MyEvents;

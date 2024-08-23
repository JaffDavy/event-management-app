// MyEvents.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './my-events.css';

const MyEvents = () => {
  const [acceptedEvents, setAcceptedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcceptedEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/events/accepted-events');
        const data = await response.json();
        setAcceptedEvents(data);
      } catch (error) {
        console.error('Error fetching accepted events:', error);
      }
    };

    fetchAcceptedEvents();
  }, []);

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const handleBackToCreateEvent = () => {
    navigate('/create-event');
  };

  return (
    <div className="my-events-container">
      <h1>My Accepted Events</h1>
      {acceptedEvents.length > 0 ? (
        <section id="accepted-events-container">
          {acceptedEvents.map((event) => (
            <div key={event.eventid} className="event-card" onClick={() => handleEventClick(event.eventid)}>
              <h2 className="event-title">{event.eventtitle}</h2>
              <p className="event-date">{new Date(event.eventdate).toLocaleDateString()}</p>
              <p className="event-location">{event.eventlocation}</p>
              <p className="event-summary">{event.eventsummary.substring(0, 100)}...</p>
            </div>
          ))}
        </section>
      ) : (
        <p>No accepted events found.</p>
      )}
      <button className="back-button" onClick={handleBackToCreateEvent}>
        Back to Create Event
      </button>
    </div>
  );
};

export default MyEvents;

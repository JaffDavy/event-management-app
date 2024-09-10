import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Component/pages/event-page/eventpage.css'

const Trend = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To navigate between pages

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/event/events/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); 
        setEvents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`); // Navigate to event details
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id="event-pages">
      <header>
        <h1>Trending Events</h1> {/* Changed heading */}
      </header>
      <section id="event-cards-container">
        {events.length > 0 ? (
          events
            .slice(0, 15)  // Limiting the display to only 20 events
            .map((event) => (
              <div key={event.eventid} className="event-card" onClick={() => handleEventClick(event.eventid)}>
                <h2 className="event-title">{event.eventtitle}</h2>
                {/* Displaying both start_date and end_date */}
                <p className="event-date">
                  {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
                </p>
                <p className="event-location">{event.eventlocation}</p>
                <p className="event-summary">{event.eventsummary.substring(0, 100)}...</p>
                <div className="event-card-footer">
                  <span className="event-attendance">Attendance: {event.attendance}</span>
                  <span className={`event-status ${event.status ? event.status.toLowerCase() : 'unknown'}`}>
                    {event.status || 'Unknown'}
                  </span>
                </div>
              </div>
            ))
        ) : (
          <p>No events available</p>
        )}
      </section>
    </div>
  );
};

export default Trend;

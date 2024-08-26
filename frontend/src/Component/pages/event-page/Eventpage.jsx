import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './eventpage.css';

function Eventpage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/event/events')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  const handleCreateEventClick = () => {
    navigate('/event-form');
  };

  const handleClick = () => {
    navigate('/Home-page');
  };

  const handleDeleteEvent = (eventId) => {
    fetch(`http://localhost:5000/event/events/${eventId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setEvents(events.filter((event) => event.eventid !== eventId));
        } else {
          console.error('Failed to delete event');
        }
      })
      .catch((error) => console.error('Error deleting event:', error));
  };

  const generateInviteLink = (eventId) => {
    return `${window.location.origin}/event/${eventId}`;
  };
  
  const copyToClipboard = (eventId) => {
    const inviteLink = generateInviteLink(eventId);
    navigator.clipboard.writeText(inviteLink)
      .then(() => {
        alert('Invite link copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy invite link to clipboard:', error);
      });
  };  

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div id="event-pages">
      <section id="event-cards-container">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.eventid} className="event-card" onClick={() => handleEventClick(event.eventid)}>
              <h2 className="event-title">{event.eventtitle}</h2>
              <p className="event-date">{new Date(event.eventdate).toLocaleDateString()}</p>
              <p className="event-location">{event.eventlocation}</p>
              <p className="event-summary">{event.eventsummary.substring(0, 100)}...</p>
              <div className="event-card-footer">
                {/* <span className="event-attendance">Attendance: {event.attendance}</span> */}
                {/* <span className={`event-status ${event.status ? event.status.toLowerCase() : 'unknown'}`}> */}
                  {/* {event.status || 'Unknown'} */}
                {/* </span> */}
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteEvent(event.eventid);
                  }}
                >
                  Delete
                </button>
                <button
                  className="copy-link-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(event.eventid);
                  }}
                >
                 Link
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No events available</p>
        )}
      </section>
      <div id="event-page-button">
        <button type="button" className="btn" onClick={handleClick}>
          Back
        </button>
        <button type="button" className="btn" onClick={handleCreateEventClick}>
          Create Event
        </button>
      </div>
    </div>
  );
}

export default Eventpage;

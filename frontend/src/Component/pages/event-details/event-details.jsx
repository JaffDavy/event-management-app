import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './event-details.css';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/event/events/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Event not found');
        }
        return response.json();
      })
      .then((data) => setEvent(data))
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  }, [id]);

  const handleAttendance = (willAttend) => {
    const endpoint = willAttend ? 'attend' : 'decline';
    
    fetch(`http://localhost:5000/event/events/${id}/${endpoint}`, {
      method: 'POST',
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update attendance');
      }
      return response.json();
    })
    .then((data) => {
      alert(willAttend ? 'You are attending the event!' : 'You have declined the invitation.');
      // Optionally, navigate back or update state to reflect the change
    })
    .catch((error) => {
      console.error(error);
      alert('There was an error updating your attendance.');
    });
  };

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <>
      <div className="event-detail">
        <h1 className="event-title">{event.eventtitle}</h1>
        <p className="event-date"><strong>Date:</strong> {new Date(event.eventdate).toLocaleDateString()}</p>
        <p className="event-location"><strong>Location:</strong> {event.eventlocation}</p>
        <p className="event-summary"><strong>Summary:</strong> {event.eventsummary}</p>
        <p className="event-attendance"><strong>Attendance:</strong> {event.attendance}</p>
      </div>
      <div className="attendance-buttons">
        <button className="attend-button" onClick={() => handleAttendance(true)}>Attend</button>
        <button className="decline-button" onClick={() => handleAttendance(false)}>Decline</button>
      </div>
      <button className="back-button" onClick={() => navigate('/event-page')}>Back to Events</button>
    </>
  );
}

export default EventDetail;

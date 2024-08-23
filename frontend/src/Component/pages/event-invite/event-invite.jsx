import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EventInvite() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/event/event-invite/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Event not found');
        }
        return response.json();
      })
      .then((data) => {
        setEvent(data.eventDetails);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching event details:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!event) return <p>Event not found</p>;

  return (
    <div>
      <h1>{event.EventTitle}</h1>
      <p>Date: {new Date(event.EventDate).toLocaleDateString()}</p>
      <p>Location: {event.EventLocation}</p>
      <p>Summary: {event.EventSummary}</p>
      {/* Add functionality to RSVP here */}
    </div>
  );
}

export default EventInvite;

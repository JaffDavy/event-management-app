import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Eventpage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch events from the database
    fetch('http://localhost:5000/event/events')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  const handleCreateEventClick = () => {
    navigate('/event-form');
  };


  return (
    <>
      <div id="event-page">
        <div><h1>Event</h1></div>
        <div>
          <div>
            <a href="https://www.eventbrite.com/l/spring-feature-release">
              <button type="button" className="bt">
                ELEVATE | Spring Release ‘24<br />
                Discover the latest tools to take your reach and revenue to the next level<br />
                Check out what's new
              </button>
            </a>
          </div>
          <div id="eventlist">
            <div>Event</div>
            <div id="propreties">
              <div>Attendance</div>
              <div>Status</div>
              <div>Delete</div>
            </div>
          </div>
        </div>
        <button type="button" className="btn" onClick={handleCreateEventClick}>
          Create Event
        </button>
      </div>
    </>
  );
}

export default Eventpage;

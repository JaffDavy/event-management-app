import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CategoryEvents() {
  const { categoryName } = useParams(); 
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchEventsByCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5000/event/categories/${categoryName}`);
        setEvents(response.data);
      } catch (error) {
        setError('There was a problem fetching the events. Please try again later.');
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsByCategory();
  }, [categoryName]);

  const handleCategoryClick = useCallback((category) => {
    navigate(`/categories/${category}`);
  }, [navigate]);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='eventList'>
      <h2>Events in {categoryName}</h2>
      <button onClick={() => navigate('/')} aria-label="Back to Main Page">Back to Main Page</button> 
      {events.length > 0 ? (
        events.map((event, index) => (
          <div key={index} className="event-item">
            <h3>{event.eventtitle || 'No title provided'}</h3>
            <p>{event.eventsummary || 'No summary provided'}</p>
            <p>Date: {event.eventdate ? new Date(event.eventdate).toLocaleDateString() : 'No date provided'}</p>
            <p>Location: {event.eventlocation || 'Location not provided'}</p>
           
            {event.category_name && (
              <button onClick={() => handleCategoryClick(event.category_name)} aria-label={`View related category for ${event.EventTitle}`}>
                View Related Category
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No events available in this category</p>
      )}
    </div>
  );
}

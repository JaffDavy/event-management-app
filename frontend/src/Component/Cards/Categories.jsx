import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CategoryEvents() {
  const { categoryName } = useParams(); 
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchEventsByCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/event/category/${categoryName}`);
        setEvents(response.data);
      } catch (error) {
        setError('Error fetching events');
        console.error('Error fetching events:', error);
      }
    };

    fetchEventsByCategory();
  }, [categoryName]); 

  if (error) {
    return <div>{error}</div>;
  }

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`); 
  };

  return (
    <div className='eventList'>
      <h2>Events in {categoryName}</h2>
      <button onClick={() => navigate('/')}>Back to Main Page</button> 
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} className="event-item">
            <h3>{event.EventTitle || 'No title provided'}</h3>
            <p>{event.EventSummary || 'No summary provided'}</p>
            <p>Date: {event.EventDate ? new Date(event.EventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'No date provided'}</p>
            <p>Location: {event.EventLocation || 'Location not provided'}</p>
           
            <button onClick={() => handleCategoryClick(event.category_name)}>View Related Category</button>
          </div>
        ))
      ) : (
        <p>No events available in this category</p>
      )}
    </div>
  );
}

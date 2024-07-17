import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const EventForm = () => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
  });
  const [mapCenter, setMapCenter] = useState({ lat: 3.8667, lng: 11.5167 }); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'location') {
      fetchCoordinates(value);
    }
  };

  const fetchCoordinates = async (address) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBBfJLki7uACjjr1mSLT533j0iGrNX8tPE`
      );
      const { lat, lng } = response.data.results[0].geometry.location;
      setMapCenter({ lat, lng });
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    // Handle event creation here (e.g., send data to a server).
    console.log('Event data:', eventData);
  };

  return (
    <div>
      <form onSubmit={handleCreateEvent}>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={eventData.title}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Event Location"
          value={eventData.location}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={eventData.description}
          onChange={handleInputChange}
        />
        <button type="submit">Create Event</button>
      </form>
      {/* Add the Google Map */}
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBBfJLki7uACjjr1mSLT533j0iGrNX8tPE' }} 
          center={mapCenter}
          defaultZoom={10} 
        >
          {/* You can add markers or other components here */}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default EventForm;
AIzaSyCTUuCz_ECc8WF7Byfg_Yjrph2oyUvVboU
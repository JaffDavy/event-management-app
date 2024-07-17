import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const Marker = ({ text }) => <div>{text}</div>;

const EventForm = () => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
  });
  const [mapCenter, setMapCenter] = useState({ lat: 3.8667, lng: 11.5167 });
  const [markerPosition, setMarkerPosition] = useState({ lat: 3.8667, lng: 11.5167 });
  const [locationEntered, setLocationEntered] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'location' && value.trim() !== '') {
      setLocationEntered(true);
      fetchCoordinates(value);
    } else if (name === 'location' && value.trim() === '') {
      setLocationEntered(false);
    }
  };

  const fetchCoordinates = async (address) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyDArOmk1rwV_6faX4ss7aCGZ3NVZ12H_AY`
      );
      console.log('Geocode response:', response.data);
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        console.log(`Coordinates for ${address}: ${lat}, ${lng}`);
        setMapCenter({ lat, lng });
        setMarkerPosition({ lat, lng });
      } else {
        console.error('No results found for the given address.');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
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
      {locationEntered && (
        <div style={{ height: '300px', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDArOmk1rwV_6faX4ss7aCGZ3NVZ12H_AY' }}
            center={mapCenter}
            defaultZoom={10}
          >
            <Marker
              lat={markerPosition.lat}
              lng={markerPosition.lng}
              text="Event Location"
            />
          </GoogleMapReact>
        </div>
      )}
    </div>
  );
};

export default EventForm;

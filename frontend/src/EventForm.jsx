import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const Marker = ({ text }) => <div>{text}</div>;

const EventForm = () => {
    const [eventData, setEventData] = useState({
        title: '',
        date: '',
        location: '',
        description: '',
        category_id: '', 
    });
    const [categories, setCategories] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 3.8667, lng: 11.5167 });
    const [markerPosition, setMarkerPosition] = useState({ lat: 3.8667, lng: 11.5167 });
    const [locationEntered, setLocationEntered] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/event/categories'); 
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

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
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_GOOGLE_MAPS_API_KEY`
            );
            if (response.data.results.length > 0) {
                const { lat, lng } = response.data.results[0].geometry.location;
                setMapCenter({ lat, lng });
                setMarkerPosition({ lat, lng });
            } else {
                console.error('No results found for the given address.');
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error);
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/events/events', eventData);
            console.log('Event created:', response.data);
        } catch (error) {
            console.error('Failed to submit event:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='event'>
            <form onSubmit={handleCreateEvent}>
                <input className='events'
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    value={eventData.title}
                    onChange={handleInputChange}
                />
                <input className='events'
                    type="date"
                    name="date"
                    value={eventData.date}
                    onChange={handleInputChange}
                />
                <input className='events'
                    type="text"
                    name="location"
                    placeholder="Event Location"
                    value={eventData.location}
                    onChange={handleInputChange}
                />
                <textarea className='events'
                    name="description"
                    placeholder="Event Description"
                    value={eventData.description}
                    onChange={handleInputChange}
                />
                
<label htmlFor="capacity">Event Capacity:</label>
<input
    type="number"
    id="capacity"
    name="capacity"
    value={capacity}
    onChange={(e) => setCapacity(e.target.value)}
    required
/>

                <select 
                    className='events'
                    name="category_id"
                    value={eventData.category_id}
                    onChange={handleInputChange}
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Create Event</button>
            </form>
            {locationEntered && (
                <div style={{ height: '300px', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }}
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

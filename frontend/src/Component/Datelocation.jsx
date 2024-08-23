import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Datelocation = () => {
    const [map, setMap] = useState(null);
    const [geocoder, setGeocoder] = useState(null);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [categories, setCategories] = useState([]); 
    const [selectedCategory, setSelectedCategory] = useState('');
    const [error, setError] = useState(null); // State to hold error messages
    const navigate = useNavigate();

    useEffect(() => {
        // Load Google Maps script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
        script.async = true;
        document.head.appendChild(script);

        script.onerror = () => {
            console.error("Failed to load the Google Maps API script.");
        };

        window.initMap = () => {
            const mapInstance = new google.maps.Map(document.getElementById("map"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });
            const geocoderInstance = new google.maps.Geocoder();
            setMap(mapInstance);
            setGeocoder(geocoderInstance);
        };

        script.onload = () => {
            window.initMap();
        };

        // Fetch categories
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/event/categories'); 
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    console.error('Failed to fetch categories:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const handleInput = (event) => {
        const address = event.target.value;
        setLocation(address);
        geocodeAddress(address);
    };

    const geocodeAddress = (address) => {
        if (geocoder && map) {
            geocoder.geocode({ 'address': address }, (results, status) => {
                if (status === 'OK') {
                    map.setCenter(results[0].geometry.location);
                    new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                } else {
                    console.error('Geocode was not successful for the following reason: ' + status);
                }
            });
        } else {
            console.error('Geocoder or map is not initialized.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate required fields
        if (!title || !summary || !date || !location || !selectedCategory) {
            setError('All fields are required');
            return;
        }

        const eventData = {
            title,
            summary,
            date,
            location,
            category_id: selectedCategory || null
        };

        try {
            const response = await fetch('http://localhost:5000/event/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });

            if (response.ok) {
                console.log('Event submitted successfully');
                navigate('/create-event');
            } else {
                const errorData = await response.json();
                setError(`Failed to submit event: ${errorData.error}`);
                console.error('Failed to submit event:', response.statusText, errorData);
            }
        } catch (error) {
            setError('Error submitting event');
            console.error('Error submitting event:', error);
        }
    };

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <h4>Event Title</h4>
                <label htmlFor="event-title">
                    Be clear and descriptive with a title that tells people what your event is about.
                </label>
                <input
                    type="text"
                    id="event-title"
                    name="event-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <h4>Event Summary</h4>
                <label htmlFor="event-summary">
                    Grab people's attention with a short description about your event. Attendees will see this at the top of your event page.
                </label>
                <textarea
                    id="event-summary"
                    name="event-summary"
                    rows="4"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    required
                ></textarea>

                <label htmlFor="event-date">Event Date:</label>
                <input
                    type="date"
                    id="event-date"
                    name="event-date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <label htmlFor="event-location">Event Location:</label>
                <input
                    type="text"
                    id="event-location"
                    name="event-location"
                    value={location}
                    onChange={handleInput}
                    required
                />

                <label htmlFor="event-category">Event Category (Optional):</label>
                <select
                    id="event-category"
                    name="event-category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <div id="map" style={{ height: '400px', width: '100%' }}></div>
                <button type="submit">Submit</button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Datelocation;

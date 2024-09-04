import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventRegistration = () => {
    const [events, setEvents] = useState([]);
    const [userRegistrations, setUserRegistrations] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/event/events'); 
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data);
                } else {
                    console.error('Failed to fetch events:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        const fetchUserRegistrations = async () => {
            try {
                const userId = 1;
                const response = await fetch(`http://localhost:5000/event/users/${userId}/registrations`);
                if (response.ok) {
                    const data = await response.json();
                    setUserRegistrations(data);
                } else {
                    console.error('Failed to fetch user registrations:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user registrations:', error);
            }
        };

        fetchEvents();
        fetchUserRegistrations().finally(() => setLoading(false));
    }, []);

    const handleRegister = async () => {
        if (!selectedEvent) {
            setError('Please select an event to register for.');
            return;
        }

        try {
            const userId = 1; 
            const response = await fetch(`http://localhost:5000/events/${selectedEvent}`);
            const event = await response.json();

            if (event.registered_count >= event.capacity) {
                setError('This event is fully booked');
                return;
            }

            // Register the user
            const registerResponse = await fetch('http://localhost:5000/events/${selectedEvent}/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId }),
            });

            if (registerResponse.ok) {
                console.log('Registered successfully');
                navigate('/user-registrations');
            } else {
                const errorData = await registerResponse.json();
                setError(`Failed to register: ${errorData.error}`);
                console.error('Failed to register:', errorData);
            }
        } catch (error) {
            setError('Error registering for the event');
            console.error('Error registering for the event:', error);
        }
    };

    const handleCancelRegistration = async (registrationId) => {
        try {
            const response = await fetch(`http://localhost:5000/registrations/${registrationId}/cancel`, {
                method: 'PUT',
            });

            if (response.ok) {
                console.log('Registration cancelled successfully');
                setUserRegistrations(userRegistrations.filter(reg => reg.registration_id !== registrationId));
            } else {
                const errorData = await response.json();
                setError(`Failed to cancel registration: ${errorData.error}`);
                console.error('Failed to cancel registration:', errorData);
            }
        } catch (error) {
            setError('Error cancelling registration');
            console.error('Error cancelling registration:', error);
        }
    };

    return (
        <div className="event-registration">
            <h2>Event Registration</h2>

            <div>
                <h3>Register for an Event</h3>
                <select
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                >
                    <option value="">Select an Event</option>
                    {events.map(event => (
                        <option key={event.event_id} value={event.event_id}>
                            {event.eventtitle}
                        </option>
                    ))}
                </select>
                <button onClick={handleRegister}>Register</button>
            </div>

            <div>
                <h3>Your Registrations</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {userRegistrations.length === 0 ? (
                            <p>You have no registrations.</p>
                        ) : (
                            userRegistrations.map(reg => (
                                <li key={reg.registration_id}>
                                    {reg.eventtitle} - {reg.status} {/* Corrected property name */}
                                    <button onClick={() => handleCancelRegistration(reg.registration_id)}>
                                        Cancel Registration
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>

            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default EventRegistration;

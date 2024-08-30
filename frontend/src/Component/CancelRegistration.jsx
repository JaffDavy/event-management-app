import React, { useState, useEffect } from 'react';

const CancelRegistration = ({ onCancel }) => {
    const [registrations, setRegistrations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const userId = 1; // Replace with actual user ID
                const response = await fetch(`http://localhost:5000/users/${userId}/registrations`);
                if (response.ok) {
                    const data = await response.json();
                    setRegistrations(data);
                } else {
                    console.error('Failed to fetch registrations:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching registrations:', error);
            }
        };

        fetchRegistrations();
    }, []);

    const handleCancel = (registrationId) => {
        onCancel(registrationId);
    };

    return (
        <div>
            <h3>Your Registrations</h3>
            <ul>
                {registrations.length === 0 ? (
                    <p>You have no registrations.</p>
                ) : (
                    registrations.map(reg => (
                        <li key={reg.registration_id}>
                            {reg.EventTitle} - {reg.status}
                            <button onClick={() => handleCancel(reg.registration_id)}>
                                Cancel Registration
                            </button>
                        </li>
                    ))
                )}
            </ul>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default CancelRegistration;

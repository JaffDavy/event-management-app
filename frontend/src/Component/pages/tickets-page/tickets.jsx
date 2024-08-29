import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// TicketCard Component
const TicketCard = ({ ticket }) => {
    return (
        <div className="ticket-card">
            <h3>{ticket.EventTitle}</h3>
            <p>Date: {new Date(ticket.EventDate).toLocaleDateString()}</p>
            <p>Location: {ticket.EventLocation}</p>
            <p>Purchased by: {ticket.UserName}</p>
            <p>Purchase Date: {new Date(ticket.PurchaseDate).toLocaleString()}</p>
        </div>
    );
};

const TicketsPage = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch('http://localhost:5000/event/tickets');
                if (!response.ok) {
                    throw new Error('Failed to fetch tickets');
                }
                const data = await response.json();
                setTickets(data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
                setError('Error fetching tickets');
            }
        };

        fetchTickets();
    }, []);

    const handleBackToHome = () => {
        navigate('/'); // Navigate to the home page
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="tickets-page">
            <h1>Accepted Tickets</h1>
            <div className="tickets-container">
                {tickets.map(ticket => (
                    <TicketCard key={ticket.TicketID} ticket={ticket} />
                ))}
            </div>
            <button className="back-button" onClick={handleBackToHome}>
                Back to Home
            </button>
        </div>
    );
};

export default TicketsPage;

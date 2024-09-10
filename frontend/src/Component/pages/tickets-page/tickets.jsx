import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// TicketCard Component
const TicketCard = ({ ticket }) => {
    return (
        <div className="ticket-card">
            <h3>{ticket.eventtitle || ticket.EventTitle}</h3>
            <p>Start Date: {new Date(ticket.start_date).toLocaleDateString()}</p>
            <p>End Date: {new Date(ticket.end_date).toLocaleDateString()}</p>
            <p>Location: {ticket.eventlocation || ticket.EventLocation}</p>
            <p>Purchased by: {ticket.fullname || ticket.fullname}</p>
            <p>Email: {ticket.user_email || ticket.Email}</p>
            <p>Status: {ticket.status || ticket.Status}</p>
        </div>
    );
};

const TicketsPage = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const handleBackToHome = () => {
        navigate('/');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="tickets-page">
            <h1>Accepted Tickets</h1>
            <div className="tickets-container">
                {tickets.length > 0 ? (
                    tickets.map(ticket => (
                        <TicketCard key={ticket.ticket_id || ticket.TicketID} ticket={ticket} /> 
                    ))
                ) : (
                    <p>No tickets available.</p>
                )}
            </div>
            <button className="back-button" onClick={handleBackToHome}>
                Back to Home
            </button>
        </div>
    );
};

export default TicketsPage;

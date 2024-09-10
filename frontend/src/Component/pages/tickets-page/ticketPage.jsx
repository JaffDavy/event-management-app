import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (email) {
      axios.get(`/api/tickets/${email}`)
        .then(response => {
          setTickets(response.data.tickets);
          setError('');
        })
        .catch(err => {
          setError('Failed to fetch tickets');
          console.error(err);
        });
    }
  }, [email]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <h1>Your Tickets</h1>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
      />
      <button onClick={() => email && setEmail(email)}>Fetch Tickets</button>
      {error && <p>{error}</p>}
      {tickets.length > 0 ? (
        <ul>
          {tickets.map(ticket => (
            <li key={ticket.ticket_number}>
              Ticket Number: {ticket.ticket_number}, Event: {ticket.eventtitle}, Status: {ticket.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tickets found.</p>
      )}
    </div>
  );
};

export default TicketsPage;

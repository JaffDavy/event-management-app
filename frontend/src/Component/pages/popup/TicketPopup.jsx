// TicketPopup.js
import React from 'react';
import './TicketPopup.css'; // Your CSS for the modal

const TicketPopup = ({ isOpen, onClose, ticket }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Ticket Information</h2>
        <p><strong>User Email:</strong> {ticket.user_email}</p>
        <p><strong>Event Title:</strong> {ticket.eventtitle}</p>
        <p><strong>Ticket Number:</strong> {ticket.ticket_number}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TicketPopup;

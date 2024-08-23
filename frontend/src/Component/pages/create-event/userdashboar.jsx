import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

const Dashboard = ({ userName }) => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">User Dashboard</h1>
      <p className="dashboard-user">Hi Welcome {userName}</p>
      <nav className="dashboard-nav">
        <Link to="/event-form" className="dashboard-link">Create New Event</Link>
        <Link to="/my-events" className="dashboard-link">My Events</Link>
      </nav>
    </div>
  );
};

export default Dashboard;

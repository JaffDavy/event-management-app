import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css'

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <aside className="sidebar">
            <h1>Welcome to the Dashboard</h1>
                <nav>
                    <ul>
                        <li><Link to="/event-form">Create An Event</Link></li>
                        <li><Link to="/register-event">Register Events</Link></li>
                        <li><Link to="/view-registrations">View Registrations</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className="main-content">
                <header className="dashboard-header">
                </header>
                <section className="dashboard-body">
                    <p>Select an option from the menu to manage events, registrations, and more.</p>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;

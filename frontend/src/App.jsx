import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Authen from "./Component/Authen";
import Homepage from "./Component/pages/home-page/Home-page";
import { AuthProvider } from "./Component/authenContext";
import CreateEvent from "./Component/pages/create-event/CreateEvent";
import EventForm from "./Component/EventForm";
import Eventpage from "./Component/pages/event-page/Eventpage";
import CategoryEvents from './Component/Cards/Categories';
import EventInvitePage from "./Component/pages/event-invite/event-invite";
import EventDetail from "./Component/pages/event-details/event-details";    
import EventRegistration from './Component/EventRegistration';     
import ViewRegistrations from './Component/ViewRegistrations';     
import CancelRegistration from './Component/CancelRegistration';
import EventDashboard from './Component/EventDashboard'; // Import EventDashboard
import MyEvents from './Component/MyEvents'; // Import MyEvents
import IconWrapper from './Component/IconWrapper'; // Import IconWrapper

const AppLayout = () => {
  const location = useLocation();
  const showDashboard = ["/eventdashboard", "/my-events"]; // Example paths

  return (
    <div className="app-container">
      {showDashboard.includes(location.pathname) && <EventDashboard />}
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/authen" element={<Authen />} />
          <Route path="/categories" element={<CategoryEvents />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/event-page" element={<Eventpage />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/register-event" element={<EventRegistration />} />
          <Route path="/cancel-registration" element={<CancelRegistration />} />
          <Route path="/view-registrations" element={<ViewRegistrations />} />
          <Route path="/event-invite" element={<EventInvitePage />} />
          <Route path="/event-form" element={<EventForm />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/eventdashboard" element={<EventDashboard />} />
          <Route path="/iconwrapper" element={<IconWrapper />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppLayout />
    </Router>
  </AuthProvider>
);

export default App;

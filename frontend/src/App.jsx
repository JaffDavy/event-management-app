import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Authen from "./Component/Authen";
import Homepage from "./Component/pages/home-page/Home-page";
import { AuthProvider } from "./Component/authenContext";
import CreateEvent from "./Component/pages/create-event/CreateEvent";
import Eventpage from "./Component/pages/event-page/Eventpage";
import CategoryEvents from './Component/Cards/Categories';
import EventInvitePage from "./Component/pages/event-invite/event-invite";
import EventDetail from "./Component/pages/event-details/event-details";
import Dashboard from "./Component/pages/dashboard/dashboard";
import MyEvents from "./Component/pages/myevents/myevents";
import IconWrapper from "./Component/Iconwrapper";
import TicketsPage from "./Component/pages/tickets-page/tickets";
import EventRegistration from './Component/EventRegistration';
import ViewRegistrations from './Component/ViewRegistrations';
import CancelRegistration from './Component/CancelRegistration';
import EventForm from "./Component/pages/event-form/EventForm";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/category/:categoryName" element={<CategoryEvents />} />
          <Route path="/authen" element={<Authen />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/event-page" element={<Eventpage />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/register-event" element={<EventRegistration />} />
          <Route path="/cancel-registration" element={<CancelRegistration />} />
          <Route path="/view-registrations" element={<ViewRegistrations />} />
          <Route path="/event-invite" element={<EventInvitePage />} />
          <Route path="/myevents" element={<MyEvents />} />
          <Route path="/eventdashboard" element={<Dashboard />} />
          <Route path="/iconwrapper" element={<IconWrapper />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/event-form" element={<EventForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Authen from "./Component/Authen";
import Homepage from "./Component/pages/home-page/Home-page";
import { AuthProvider } from "./Component/authenContext";
import CreateEvent from "./Component/pages/create-event/CreateEvent";
import EventForm from "./Component/EventForm";
import Eventpage from "./Component/pages/event-page/Eventpage";
import EventInvitePage from "./Component/pages/event-invite/event-invite";
import EventDetail from "./Component/pages/event-details/event-details";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/authen" element={<Authen />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/event-invite" element={<EventInvitePage />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/event-page" element={<Eventpage />} />
            <Route path="/event-form" element={<EventForm />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
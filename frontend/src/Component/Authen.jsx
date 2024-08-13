import React, { useState } from "react";
import "../App.css";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/registration/Register";

export default function Authen() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <>
      <div className="App">
        {
          currentForm === "login" ? 
            <Login onFormSwitch={toggleForm} /> : 
            <Register onFormSwitch={toggleForm} />
        }
      </div>
    </>
  );
}

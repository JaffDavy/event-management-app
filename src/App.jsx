import React, { useState } from 'react';
import EventForm from './EventForm';
import { Login } from './Login';
import { Register } from './Register';
import './App.css'; // Import your CSS file here
import React, { useState } from "react";
// import logo from './logo.svg';
import { Login } from "./Login";
import { Register } from "./Register";
import './App.css'
import NavBar from './Components/Navbar'
import Iconwrapper from './Components/Iconwrapper'
import Trend from './Components/Toptrendberlin'

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div>
      <h1>Event Management System</h1>
      <EventForm />
      <div className="App">
        {currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}
      </div>
      <header>
        {/* Include your NavBar component here */}
      </header>
      <body>
        <div className='fineyourmatch'>
          <button><a href='https://www.eventbrite.com/b/local/home-and-lifestyle/dating/' className="button-link">Find your next date</a></button>
        </div>
        {/* Include your Iconwrapper component here */}
        <Iconwrapper />
        <Trend />
      </body>
    </div>
  );
}

export default App;

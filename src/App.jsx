import React, { useState } from 'react';
import EventForm from './EventForm'; // Make sure this component is defined
import Login from './Login'; // Import the Login component
import Register from './Register'; // Import the Register component
import Homepage from './Components/Home-page'; // Import the Homepage component
import NavBar from './Components/Navbar'; // Import the NavBar component
import Iconwrapper from './Components/Iconwrapper'; // Import the Iconwrapper component
import './App.css';
import './App.css'
import NavBar from './Components/Navbar'
import Iconwrapper from './Components/Iconwrapper'
import Trend from './Components/Toptrendberlin'
import Moreevents from './Components/moreevents'
import Popular from './Components/popularcitys'
import About from './Components/About'

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div>
      <h1>Event Management System</h1>
      <EventForm />
      <div className="App">
        {currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}
      </div>
      <header>
        <NavBar /> {/* Include your NavBar component here */}
      </header>
      <body>
        <div className="fineyourmatch">
          <button>
            <a href="https://www.eventbrite.com/b/local/home-and-lifestyle/dating/" className="button-link">
              Find your next date
            </a>
          </button>
        </div>
        <Iconwrapper /> {/* Include your Iconwrapper component here */}
        <Iconwrapper />
        <Trend />
        <Moreevents />
        <Popular />
        <About />
      </body>
    </div>
  );
}

export default App;

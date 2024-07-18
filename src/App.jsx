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
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>
  );
    <>
      <header>
        <NavBar />
      </header>
      <body>
        <div className='fineyourmatch'>
          <button><a href='https://www.eventbrite.com/b/local/home-and-lifestyle/dating/' class="button-link">Fine your next date</a></button>
        </div>
        <Iconwrapper />
        <Trend />
      </body>
    </>
  )
}

export default App;
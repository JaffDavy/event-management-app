import React, { useState } from "react";
import '../App.css'
import NavBar from "./Navbar";
import Iconwrapper from './Iconwrapper'
import Trend from './Toptrendberlin'
import Moreevents from './moreevents'
import Popular from './popularcitys'
import About from './About'

function Homepage() {

  return (

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
      <Moreevents />
      <Popular />
      <About />
    </body>
  </>
  )

}

export default Homepage;
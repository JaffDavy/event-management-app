import './App.css'
import NavBar from './Components/Navbar'
import Iconwrapper from './Components/Iconwrapper'
import Trend from './Components/Toptrendberlin'

function App() {

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
      </body>
    </>
  )
}

export default App

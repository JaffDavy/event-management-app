import './App.css'
import NavBar from './Components/Navbar'
import Iconwrapper from './Components/Iconwrapper'

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
      </body>
    </>
  )
}

export default App

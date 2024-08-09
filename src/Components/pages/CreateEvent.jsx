import EventForm from '../EventForm'
import Eventpage from '../Eventpage'
import Header from '../header'
import Dashboard from '../dashboard'

function CreateEvent() {

  return (
    <>
      <Header />
      <Eventpage /> 
      < EventForm  />
      <Dashboard />
    </>
  )
}

export default CreateEvent

import Datelocation from "./Datelocation";
import { useNavigate } from 'react-router-dom';


const EventForm = () => {

  const navigate = useNavigate();

  const handleCreateEventClick = () => {
    navigate('/event-page');
  };
  return (
    <>
      <button onClick={handleCreateEventClick}>back to events</button>
      <div className='event'>
        <Datelocation />
      </div >
    </>
  );
}

export default EventForm;

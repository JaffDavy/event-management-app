import Tittesummary from "./titlesummary";
import Datelocation from "./Datelocation";

const EventForm = () => {

  return (
    <>
      <button>back to events</button>
      <div className='event'>
        <Tittesummary />
        <Datelocation />
      </div >
    </>
  );
}

export default EventForm;

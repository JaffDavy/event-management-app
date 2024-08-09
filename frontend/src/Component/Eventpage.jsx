function Eventpage() {

  return (
    <>
      <div id="event-page">
        <div><h1>Event</h1></div>
        <div>
          <div>
            <a href="https://www.eventbrite.com/l/spring-feature-release">
              <button type="button" class="bt">ELEVATE | Spring Release ‘24<br></br>
                Discover the latest tools to take your reach and revenue to the next level<br></br>
                Check out what's new
              </button>
            </a>
          </div>
          <div id="eventlist">
            <div>Event</div>
            <div id="propreties">
              <div>Attendance</div>
              <div>Status</div>
              <div>delete</div>
            </div>
          </div>
        </div>
        <button type="button" class="btn">Create Event</button>
      </div>
    </>
  );
};

export default Eventpage;

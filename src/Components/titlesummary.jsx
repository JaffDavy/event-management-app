
const Tittesummary = () => {

    return (
        <>
            <div class="card">
                <h2>Event Overview</h2>
                <h4>Event title</h4>
                <form>
                    <label for="event-title">Be clear and descriptive with a title that tells people what your event is about.</label>
                    <input type="text" id="event-title" name="event-title" required />
                    <h4>Event Summary</h4>
                    <label htmlFor="event-summary">Grab people's attention with a short description about your event. Attendees will see this at the top of your event page. (140 characters max)</label>
                    <textarea id="event-summary" name="event-summary" rows="4" required></textarea>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default Tittesummary;
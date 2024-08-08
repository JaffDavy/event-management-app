import More1 from "./moreeventscards/fst";
import More2 from "./moreeventscards/scnd";
import More3 from "./moreeventscards/trd";
import More4 from "./moreeventscards/fr";
import More5 from "./moreeventscards/fv";
import More6 from "./moreeventscards/sx";
import More7 from "./moreeventscards/svn";
import More8 from "./moreeventscards/eght";

function Moreevents() {
    return (
        <>
            <div className="more-trend">
                <div id="simple-header">
                    <h5>More Events</h5>
                </div>
                <div className="card-segment">
                    <div className="cards">
                        <div className="first-row">
                            <div>
                                <More1 />
                            </div>
                            <div>
                                <More2 />
                            </div>
                        </div>
                        <div className="first-row">
                            <div>
                                <More3 />
                            </div>
                            <div>
                                <More4 />
                            </div>
                        </div>
                        <div className="first-row">
                            <div>
                                <More5 />
                            </div>
                            <div>
                                <More6 />
                            </div>
                        </div>
                        <div className="first-row">
                            <div>
                                <More7 />
                            </div>
                            <div>
                                <More8 />
                            </div>
                        </div>
                    </div>
                    <div id="but">
                        <button><a href='https://www.eventbrite.com/d/germany--berlin/events/' class="button-li">More events in Berlin</a></button>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Moreevents;
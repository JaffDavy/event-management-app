import Cards from "./Cards/Firstcard";
import Card2 from "./Cards/Secondcard";
import Card3 from "./Cards/thirdcard";
import Card4 from "./Cards/fourth";
import Card5 from "./Cards/fithcard";
import Card6 from "./Cards/sixthcard";
import Card7 from "./Cards/seventhcard";
import Card8 from "./Cards/eightcard";

function Trend() {
    return (
        <>
            <div className="berlin-trend">
                <div id="simple-header">
                    <h5>Top Trending In Berlin</h5>
                </div>
                <div className="card-segment">
                    <div className="cards">
                        <div className="first-row">
                            <div>
                                <Cards />
                            </div>
                            <div>
                                <Card2 />
                            </div>
                        </div>
                        <div className="first-row">
                            <div>
                                <Card3 />
                            </div>
                            <div>
                                <Card4 />
                            </div>
                        </div>
                        <div className="first-row">
                            <div>
                                <Card5 />
                            </div>
                            <div>
                                <Card6 />
                            </div>
                        </div>
                        <div className="first-row">
                            <div>
                                <Card7 />
                            </div>
                            <div>
                                <Card8 />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Trend;
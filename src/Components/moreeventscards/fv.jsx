import Card from 'react-bootstrap/Card';

function More5() {
    return (
        <Card style={{ width: '12rem', height: '20rem' }}>
            <a href='https://www.eventbrite.de/e/elvis-the-show-his-life-in-music-tickets-834297786137?aff=ehometext'>
                <Card.Img variant="top" src="src/assets/fv.jpg" />
            </a>
            <Card.Body>
                <Card.Title>Elvis the Show - His Life In Music</Card.Title>
                <Card.Text>
                    Fri, Aug 2 • 8:00 PM

                    Freilichtbühne an der Zitadelle

                    From €0.00

                    Kulturhaus Spandau

                    2k followers
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default More5;
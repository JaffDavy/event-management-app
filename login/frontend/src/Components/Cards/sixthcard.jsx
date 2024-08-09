import Card from 'react-bootstrap/Card';

function Card6() {
    return (
        <Card style={{ width: '12rem', height: '18rem' }}>
            <a href='https://www.eventbrite.de/e/petticoat-the-voices-of-rockn-roll-tickets-771372745647?aff=ebdssbdestsearch'>
                <Card.Img variant="top" src="src/assets/sixth.jpg" />
            </a>
            <Card.Body>
                <Card.Title>Petticoat - The Voices of Rock'n´'Roll</Card.Title>
                <Card.Text>
                    Saturday • 7:00 PM

                    Freilichtbühne an der Zitadelle

                    From €0.00

                    Kulturhaus Spandau

                    2k followers
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Card6;
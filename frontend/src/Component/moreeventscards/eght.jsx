import Card from 'react-bootstrap/Card';

function More8() {
    return (
        <Card style={{ width: '12rem', height: '18rem' }}>
            <a href='https://www.eventbrite.de/e/iwb-fcked-up-stories-night-meet-up-at-grammarly-tickets-944882367597?aff=ehometext'>
                <Card.Img variant="top" src="src/assets/eght.jpg" />
            </a>
            <Card.Body>
                <Card.Title>IWB F*cked Up Stories Night & Meet-Up at Grammarly</Card.Title>
                <Card.Text>
                    Thu, Jul 25 • 6:00 PM

                    Grammarly Berlin

                    From €17.17

                    International Women in Berlin

                    479 followers
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default More8;
import Card from 'react-bootstrap/Card';

function Card4() {
    return (
        <Card style={{ width: '12rem', height: '18rem' }}>
            <a href='https://www.eventbrite.com/e/sammy-obeid-in-berlin-with-ahmed-tickets-891272709667?aff=ebdssbdestsearch'>
                <Card.Img variant="top" src="src/assets/fourth.jpg" />
            </a>
            <Card.Body>
                <Card.Title>Sammy Obeid in Berlin with Ahmed!</Card.Title>
                <Card.Text>
                    Tue, Jul 23 • 6:00 PM

                    Huxleys Neue Welt

                    From €33.70

                    Sammy Obeid

                    693 followers
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Card4;
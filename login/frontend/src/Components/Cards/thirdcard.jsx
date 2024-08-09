import Card from 'react-bootstrap/Card';

function Card3() {
    return (
        <Card style={{ width: '12rem', height: '20rem' }}>
            <a href='https://www.eventbrite.de/e/thegeekconf-2024-tickets-851985861647?aff=ebdssbdestsearch'>
                <Card.Img variant="top" src="src/assets/third.jpg" />
            </a>
            <Card.Body>
                <Card.Title>thegeekconf 2024</Card.Title>
                <Card.Text>
                    hu, Jul 25 • 8:30 AM

                    Kultur Büro Elisabeth gGmbH

                    From €0.00

                    2 for 1 deal

                    thegeekconf

                    26 followers
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Card3;
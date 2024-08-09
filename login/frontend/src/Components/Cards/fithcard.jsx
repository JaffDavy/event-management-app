import Card from 'react-bootstrap/Card';

function Card5() {
    return (
        <Card style={{ width: '12rem', height: '20rem' }}>
            <a href='https://www.eventbrite.com/e/indian-food-and-trade-festival-tickets-913773740857?aff=ehometext'>
                <Card.Img variant="top" src="src/assets/fith.jpg" />
            </a>
            <Card.Body>
                <Card.Title>Indian Food and Trade Festival</Card.Title>
                <Card.Text>
                    Sat, Jul 27 • 11:00 AM

                    Wassertorpl. 1

                    From €0.00

                    Berlin events festivals

                    29 followers
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Card5;
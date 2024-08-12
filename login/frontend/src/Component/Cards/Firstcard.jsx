import Card from 'react-bootstrap/Card';

function Cards() {
    return (
        <Card style={{ width: '12rem', height: '20rem' }}>
            <a href='https://www.eventbrite.de/e/der-beste-poetry-slam-der-welt-2024-open-air-am-strand-tickets-688396190537?aff=ebdssbdestsearch'>
                <Card.Img variant="top" src="src/assets/first.jpg" />
            </a>
            <Card.Body>
                <Card.Title>The best poetry slam in the world (2024) ☀ Open air on the beach ☀</Card.Title>
                <Card.Text>
                    Saturday • 7:00 PM

                    Strandbad Orankesee

                    From €16.48

                    Der beste Poetry Slam der Welt <br></br>

                    45 followers
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Cards;
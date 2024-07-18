import Card from 'react-bootstrap/Card';

function Card7() {
    return (
        <Card style={{ width: '12rem', height: '20rem' }}>
            <a href='https://www.eventbrite.de/e/the-great-indian-food-festival-berlin-2024-wedesi-tickets-910980516247?aff=ebdssbdestsearch'>
                <Card.Img variant="top" src="src/assets/seventh.jpg" />
            </a>
            <Card.Body>
                <Card.Title>The Great Indian Food Festival Berlin 2024..|</Card.Title>
                <Card.Text>
                    Sat, Aug 3 • 12:00 PM

                    Jules Biergarten & Café

                    From €0.00

                    2 for 1 deal

                    Wedesi Berlin

                    605 followers
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Card7;
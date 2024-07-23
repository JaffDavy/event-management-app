import Card from 'react-bootstrap/Card';

function More4() {
    return (
        <Card style={{ width: '12rem', height: '18rem' }}>
            <a href='https://www.eventbrite.de/e/true-italian-pizza-street-festival-2024-tickets-896125163487?aff=ehometext'>
                <Card.Img variant="top" src="src/assets/fr.jpg" />
            </a>
            <Card.Body>
                <Card.Title>True Italian Pizza Street Festival 2024</Card.Title>
                <Card.Text>
                    Saturday • 12:00 PM

                    Jules Biergarten & Café

                    From €4.26

                    True Italian

                    336 followers
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default More4;
import Card from 'react-bootstrap/Card';

function More6() {
    return (
        <Card style={{ width: '12rem', height: '18rem' }}>
            <a href='https://www.eventbrite.de/e/irgendwann-neue-deutsche-welle-liveparty-tickets-818403766697?aff=ehometext'>
                <Card.Img variant="top" src="src/assets/sx.jpg" />
            </a>
            <Card.Body>
                <Card.Title>Irgendwann - Neue Deutsche Welle Liveparty</Card.Title>
                <Card.Text>
                    Sat, Jul 27 • 8:00 PM

                    Freilichtbühne an der Zitadelle

                    From €0.00

                    Kulturhaus Spandau

                    2k followers
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default More6;
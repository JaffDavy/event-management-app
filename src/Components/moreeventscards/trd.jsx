import Card from 'react-bootstrap/Card';

function More3() {
    return (
        <Card style={{ width: '12rem', height: '20rem' }}>
            <a href='https://www.eventbrite.de/e/admission-eintritt-comic-film-manga-fest-berlin-2024-tickets-774205859567?aff=ehometext'>
                <Card.Img variant="top" src="src/assets/trd.jpg" />
            </a>
            <Card.Body>
                <Card.Title>ADMISSION / EINTRITT @ Comic Film Manga Fest Berlin...|</Card.Title>
                <Card.Text>
                    Station Berlin

                    From €51.21

                    We Love Conventions GmbH

                    2.5k followers
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default More3;
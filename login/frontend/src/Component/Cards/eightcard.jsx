import Card from 'react-bootstrap/Card';

function Card8() {
    return (
        <Card style={{ width: '12rem', height: '18rem' }}>
            <a href='https://www.eventbrite.de/e/loophole-forever-soli-party-at-fitzroy-and-lark-feat-molly-nilsson-more-tickets-944831886607?aff=ebdssbdestsearch'>
                <Card.Img variant="top" src="src/assets/eight.jpg" />
            </a>
            <Card.Body>
                <Card.Title>TLoophole Forever! Soli party at Fitzroy and Lark feat...|</Card.Title>
                <Card.Text>
                    Fri, Jul 26 • 7:00 PM

                    LARK

                    From €21.31

                    Loophole Berlin

                    15 followers
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Card8;
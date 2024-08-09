import Card from 'react-bootstrap/Card';

function Card2() {
    return (
        <Card style={{ width: '12rem', height: '18rem' }}>
            <a href='https://www.eventbrite.com/e/flourish-conference-berlin-germany-tickets-913254297187?aff=ebdssbdestsearch'>
                <Card.Img variant="top" src="src/assets/second.jpg" />
            </a>
            <Card.Body>
                <Card.Title>FLOURISH CONFERENCE - BERLIN GERMANY</Card.Title>
                <Card.Text>
                    Tomorrow • 7:00 PM

                    Mercedes Platz

                    From $22.42

                    5F CHURCH

                    651 followers
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Card2;
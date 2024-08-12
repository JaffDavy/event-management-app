import Card from 'react-bootstrap/Card';

function More2() {
    return (
        <Card style={{ width: '12rem', height: '18rem' }}>
            <a href='https://www.eventbrite.com/e/hackerx-berlin-full-stack-0725-onsite-tickets-928590748927?aff=ehometext'>
                <Card.Img variant="top" src="src/assets/scnd.jpg" />
            </a>
            <Card.Body>
                <Card.Title>HackerX - Berlin (Full-Stack) 07/25 (Onsite)</Card.Title>
                <Card.Text>
                    Thu, Jul 25 • 6:00 PM

                    Berlin

                    From $0.00

                    HackerX

                    481 followers
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default More2;
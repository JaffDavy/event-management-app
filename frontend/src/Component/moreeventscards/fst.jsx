import Card from 'react-bootstrap/Card';

function More1() {
  return (
    <Card style={{ width: '12rem', height: '20rem' }}>
      <a href='https://www.eventbrite.com/e/megamarsch-5012-berlin-bei-nacht-2024-tickets-705904729047?aff=ehometext'>
        <Card.Img variant="top" src="src/assets/fst.jpg" />
      </a>
      <Card.Body>
        <Card.Title>Megamarsch 50/12 Berlin bei Nacht 2024</Card.Title>
        <Card.Text>
          Sat, Aug 31 • 6:00 PM

          Sport Centrum Siemensstadt

          From €69.02

          hundert24 GmbH

          9.9k followers
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default More1;
import { Card, Button } from "react-bootstrap";

function BookCard({ book }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={book.image} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.description}</Card.Text>
        <Button variant="primary">Xem chi tiết</Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;

import { Container, Row, Col } from "react-bootstrap";

const books = [
  {
    title: "Simple Way Of Piece Life",
    author: "Armor Ramsey",
    price: "$ 40.00",
    image: "https://themewagon.github.io/booksaw/images/product-item1.jpg",
  },
  {
    title: "Great Travel At Desert",
    author: "Sanchit Howdy",
    price: "$ 38.00",
    image: "https://themewagon.github.io/booksaw/images/product-item2.jpg",
  },
  {
    title: "The Lady Beauty Scarlett",
    author: "Arthur Doyle",
    price: "$ 45.00",
    image: "https://themewagon.github.io/booksaw/images/product-item3.jpg",
  },
  {
    title: "Once Upon A Time",
    author: "Klien Marry",
    price: "$ 35.00",
    image: "https://themewagon.github.io/booksaw/images/product-item4.jpg",
  },
];

function FeaturedBooks() {
  return (
    <section className="featured-section">
      <Container>
        {/* TITLE */}
        <div className="text-center mb-5">
          <span className="featured-subtitle">SOME QUALITY ITEMS</span>
          <h2 className="featured-title">Featured Books</h2>
        </div>

        {/* BOOK LIST */}
        <Row>
          {books.map((book, index) => (
            <Col lg={3} md={6} key={index}>
              <div className="book-card text-center">
                <div className="book-image-wrapper">
                  <img src={book.image} alt={book.title} />
                </div>

                <h5 className="book-title">{book.title}</h5>
                <p className="book-author">{book.author}</p>
                <p className="book-price">{book.price}</p>
              </div>
            </Col>
          ))}
        </Row>

        {/* VIEW ALL */}
        <div className="text-end mt-5">
          <a href="#" className="view-all">
            View All Products →
          </a>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedBooks;

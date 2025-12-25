import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Tabs, Tab, Row, Col } from "react-bootstrap";
import { ChevronUp, ChevronDown } from "lucide-react";
import defaultBook from "../assets/default-book.png";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => setBook(res.data))
      .catch(() => setBook(null));
  }, [id]);

  if (!book)
    return <div className="text-center py-5">Không tìm thấy sách!</div>;

  return (
    <div className="book-detail-page">
      <div className="book-top-info py-5">
        <Container>
          <Row className="gap-lg-5">
            <Col lg={5} className="text-center">
              <img
                src={
                  book.image
                    ? `http://localhost:5555/images/${book.image}`
                    : defaultBook
                }
                alt={book.title}
                className="img-fluid shadow-lg"
                style={{ maxWidth: "400px" }}
                onError={(e) => (e.target.src = defaultBook)}
              />
            </Col>

            <Col lg={6}>
              <h1 className="fw-bold">{book.title}</h1>
              <h5 className="text-muted">Tác giả: {book.author}</h5>

              <p className="price-tag">
                ${Number(book.price).toFixed(2)}
              </p>

              <p>{book.description}</p>

              <p>
                <strong>Thể loại:</strong> {book.category}
              </p>
              <p>
                <strong>Số trang:</strong> {book.pages}
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="bg-light py-5">
        <Container>
          <Tabs defaultActiveKey="description">
            <Tab eventKey="description" title="MÔ TẢ">
              <div className={isExpanded ? "expanded" : "collapsed"}>
                <p>{book.longDescription || book.description}</p>
              </div>

              <div className="text-center">
                <button onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? (
                    <>RÚT GỌN <ChevronUp /></>
                  ) : (
                    <>XEM THÊM <ChevronDown /></>
                  )}
                </button>
              </div>
            </Tab>
          </Tabs>
        </Container>
      </div>
    </div>
  );
};

export default BookDetail;

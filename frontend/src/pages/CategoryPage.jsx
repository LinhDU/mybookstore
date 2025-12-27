import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import defaultBook from "../assets/default-book.png";

function CategoryPage() {
  const { category } = useParams();

  console.log("CATEGORY PARAM:", category);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    setLoading(true);

    axios
      .get(`http://localhost:5555/books?category=${encodeURIComponent(category)}`)
      .then(res => {
        const data = res.data.data || [];
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi tải category:", err);
        setLoading(false);
      });
  }, [category]);

  return (
    <section className="featured-section">
      <Container>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="warning" />
            <p className="mt-3 text-muted">Đang tải sách theo thể loại...</p>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <span className="featured-subtitle">THỂ LOẠI</span>
              <h2 className="featured-title">{category}</h2>
              <p className="text-muted">
                Có {books.length} cuốn sách thuộc thể loại này
              </p>
            </div>

            {books.length === 0 ? (
              <div className="text-center py-5 bg-light">
                <p>Chưa có sách trong thể loại này.</p>
                <Link to="/" className="btn btn-outline-dark mt-3">
                  Quay về trang chủ
                </Link>
              </div>
            ) : (
              <Row>
                {books.map(book => (
                  <Col lg={3} md={6} key={book._id} className="mb-5">
                    <Link to={`/book/${book._id}`} className="book-card-link">
                      <div className="book-card text-center">
                        <div className="book-image-wrapper">
                          <img
                            src={book.image
                              ? `http://localhost:5555/images/${book.image}`
                              : defaultBook}
                            alt={book.title}
                            onError={(e) => (e.target.src = defaultBook)}
                          />
                        </div>
                        <h5 className="book-title">{book.title}</h5>
                        <p className="text-muted mb-1">{book.author}</p>
                        <p className="fw-bold text-danger">
                          {book.price ? Number(book.price).toLocaleString() : 0} VNĐ
                        </p>
                      </div>
                    </Link>
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </Container>
    </section>
  );
}

export default CategoryPage;

import React, { useState, useEffect } from "react"; // 1. Đảm bảo import đúng
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import defaultBook from "../assets/default-book.png";

function FeatureBooks() {
  // 2. HOOK PHẢI NẰM Ở ĐÂY (Bên trong hàm)
  const [books, setBooks] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      axios.get("http://localhost:5555/books")
      .then((res) => {
        // Lọc lấy những sách được đánh dấu là isFeatured
        const allBooks = res.data.data || res.data;
        const featured = allBooks.filter(b => b.isFeatured === true);
        setBooks(featured);
        setLoading(false);
      }) // <--- PHẢI CÓ DẤU ) Ở ĐÂY ĐỂ ĐÓNG .then
      .catch((err) => {
        console.error(err);
        setLoading(false);
      }); // <--- ĐÓNG .catch
    }, []); // <-- ĐÓNG useEffect
  if (loading) return <div className="text-center py-5">Đang tải...</div>;

  return (
    <section className="featured-section">
      <Container>
        <div className="text-center mb-5">
          <h2 className="featured-subtitle">Sản phẩm nổi bật</h2>
        </div>

        <Row>
          {books.map((book) => (
            <Col lg={3} md={6} key={book._id}>
              <Link to={`/book/${book._id}`} className="text-decoration-none">
                <div className="book-card text-center">
                  <div className="book-image-wrapper">
                    <img src={`http://localhost:5555/images/${book.image}`} alt={book.title} onError={(e) => (e.target.src = defaultBook)} />
                  </div>
                  <h5 className="book-title">{book.title}</h5>
                  <p className="book-author">{book.author}</p>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
        <div className="text-end mt-5">
          <Link to="/products" className="view-all">
            View All Products →
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default FeatureBooks;
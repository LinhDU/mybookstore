import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import defaultBook from "../assets/default-book.png";

const AllProducts = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi vào
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        const data = res.data.data || res.data;
        setBooks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi kết nối API:", err);
        setBooks([]);
        setLoading(false);
      });
  }, []);

  return (
    <section className="featured-section all-products-page">
      <Container>
        {/* TIÊU ĐỀ ĐỒNG BỘ TRANG CHỦ */}
        <div className="text-center mb-5">
          <span className="featured-subtitle">KHÁM PHÁ KHO SÁCH</span>
          <h2 className="featured-title">Tất Cả Sản Phẩm</h2>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="warning" />
            <p className="mt-3 text-muted">Đang tải danh sách sách...</p>
          </div>
        ) : books.length > 0 ? (
          <Row className="g-4">
            {books.map((book) => (
              <Col lg={3} md={4} sm={6} key={book._id} className="mb-4">
                {/* Dùng thẻ Link với class book-card-link để xóa gạch chân xanh */}
                <Link to={`/book/${book._id}`} className="book-card-link">
                  <div className="book-card text-center">
                    <div className="book-image-wrapper">
                      <img
                        src={
                          book.image
                            ? `http://localhost:5555/images/${book.image}`
                            : defaultBook
                        }
                        alt={book.title}
                        onError={(e) => (e.target.src = defaultBook)}
                      />
                    </div>
                    
                    <h5 className="book-title">{book.title}</h5>
                    <p className="book-author">{book.author}</p>
                    <p className="fw-bold text-danger">
                      {book.price ? Number(book.price).toLocaleString() : 0} VNĐ
                    </p>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5 text-muted">
            Hiện chưa có sản phẩm nào trong cửa hàng.
          </div>
        )}
      </Container>
    </section>
  );
};

export default AllProducts;
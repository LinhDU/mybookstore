import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // Thêm Link để điều hướng
import { listBooks } from "../data"; // Import dữ liệu từ file giả lập của bạn
import defaultBook from '../assets/default-book.png';

function FeaturedBooks() {
  return (
    <section className="featured-section">
      <Container>
        {/* TIÊU ĐỀ PHẦN */}
        <div className="text-center mb-5">
          <span className="featured-subtitle">SOME QUALITY ITEMS</span>
          <h2 className="featured-title">Featured Books</h2>
        </div>

        {/* DANH SÁCH SÁCH TỪ FILE DATA */}
        <Row>
          {listBooks.map((book) => (
            <Col lg={3} md={6} key={book.id}>
              {/* Bọc Link quanh card để click vào là sang trang chi tiết */}
              <Link 
                to={`/book/${book.id}`} 
                className="text-decoration-none" 
                style={{ color: 'inherit' }}
              >
                <div className="book-card text-center">
                  <div className="book-image-wrapper">
                    {/* Ảnh lấy từ dữ liệu giả lập */}
                    <img src={book.image} alt={book.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultBook;
                    }}
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                </div>
                  <h5 className="book-title">{book.title}</h5>
                  <p className="book-author">{book.author}</p>
                  {/* Định dạng lại giá tiền với dấu $ */}
                  <p className="book-price">${book.price.toFixed(2)}</p>
                </div>
              </Link>
            </Col>
          ))}
        </Row>

        {/* NÚT XEM TẤT CẢ */}
        <div className="text-end mt-5">
          <Link to="/products" className="view-all">
            View All Products →
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedBooks;
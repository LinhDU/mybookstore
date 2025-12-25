import React, { useState, useEffect } from 'react';
import { Carousel, Container, Row, Col, Spinner } from 'react-bootstrap';
import { ArrowRight, ArrowLeft, MoveRight } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import defaultBook from '../assets/default-book.png';

const FeaturedHero = () => {
  const [heroBooks, setHeroBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Lấy danh sách sách từ database và lọc cuốn nào có isHero = true
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5555/books')
      .then((res) => {
        const allBooks = res.data.data || res.data;
        // Chỉ lấy những cuốn được Admin tích chọn "isHero"
        const filtered = allBooks.filter(book => book.isHero === true);
        setHeroBooks(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi lấy dữ liệu Hero:", err);
        setLoading(false);
      });
  }, []);

  // Nếu đang tải dữ liệu
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', backgroundColor: '#f3f2ec' }}>
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  // Nếu không có cuốn sách nào được chọn làm Hero, hiển thị thông báo hoặc slide mặc định
  if (heroBooks.length === 0) {
    return null; // Hoặc bạn có thể để một slide mặc định ở đây
  }

  return (
    <section id="billboard" className="pattern-overlay">
      <Carousel 
        indicators={true} 
        interval={5000}
        fade={true} 
        nextIcon={<div className="nav-circle shadow-sm"><ArrowRight size={22} /></div>}
        prevIcon={<div className="nav-circle shadow-sm"><ArrowLeft size={22} /></div>}
      >
        {heroBooks.map((book) => (
          <Carousel.Item key={book._id}>
            <Container>
              <Row className="align-items-center" style={{ minHeight: '80vh' }}>
                
                {/* CỘT TRÁI: THÔNG TIN SÁCH */}
                <Col lg={5} md={12} className="hero-text-col offset-lg-1">
                  <h1 className="hero-title">
                    {book.title}
                  </h1>
                  <p className="hero-desc">
                    {book.description || "Khám phá những câu chuyện hấp dẫn và đầy cảm hứng tại Neverland."}
                  </p>
                  <div className="btn-wrap">
                    <Link to={`/book/${book._id}`} className="hero-btn">
                      READ MORE <MoveRight className="ms-2" size={18} />
                    </Link>
                  </div>
                </Col>

                {/* CỘT PHẢI: ẢNH SÁCH VÀ KHUNG HÌNH CHỮ NHẬT */}
                <Col lg={6} md={12} className="hero-image-col position-relative">
                  {/* Khung hình chữ nhật phía sau */}
                  <div className="frame-bg"></div>
                  
                  {/* Ảnh sách */}
                  <div className="hero-book-wrapper">
                    <img
                      className="hero-book-img"
                      src={`http://localhost:5555/images/${book.image}`}
                      alt={book.title}
                      onError={(e) => (e.target.src = defaultBook)}
                    />
                  </div>
                </Col>

              </Row>
            </Container>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default FeaturedHero;
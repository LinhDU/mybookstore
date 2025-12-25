import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import { ArrowRight, ArrowLeft, MoveRight } from 'lucide-react';
// Nếu bạn có ảnh pattern, hãy import hoặc dùng link trực tiếp trong CSS
 import patternBg from '../assets/pattern1.png'; 
 import { Link } from 'react-router-dom';

const FeaturedHero = () => {
  const slides = [
    {
      id: 1,
      title: "Life Of The Wild",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend. Amet, quis urna, a eu.",
      image: "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.media/khong-gia-dinh.jpg" // Thay bằng đường dẫn ảnh "Không Gia Đình" của bạn
    },
    {
      id: 2,
      title: "Hành Trình Vô Tận",
      description: "Khám phá những vùng đất mới qua những trang sách đầy cảm hứng. Một cuốn sách không chỉ là kiến thức mà còn là người bạn đồng hành.",
      image: "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.media/khong-gia-dinh.jpg"
    }
  ];

  return (
    <section id="billboard" className="pattern-overlay">
      <Carousel 
        indicators={true} 
        interval={5000}
        //fade={true} // Hiệu ứng chuyển cảnh mờ dần sang trọng
        nextIcon={<div className="nav-circle shadow-sm"><ArrowRight size={22} /></div>}
        prevIcon={<div className="nav-circle shadow-sm"><ArrowLeft size={22} /></div>}
      >
        {slides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <Container>
              <Row className="align-items-center" style={{ minHeight: '80vh' }}>
                
                {/* Cột chữ: Chiếm 5/12 để chừa khoảng trống cho mũi tên */}
                <Col lg={5} md={12} className="hero-text-col offset-lg-1">
                  <h1 className="hero-title">
                    {slide.title}
                  </h1>
                  <p className="hero-desc">
                    {slide.description}
                  </p>
                  <div className="btn-wrap">
                  {/* Giả sử id của cuốn sách này là 1 */}
                  <Link to="/book/1" className="hero-btn">
                    READ MORE <MoveRight className="ms-2" size={18} />
                  </Link>
                  </div>
                </Col>

                {/* Cột ảnh: Chiếm 6/12 */}
                <Col lg={6} md={12} className="hero-image-col">
              {/* Đổi tên từ blob-bg thành frame-bg */}
              <div className="frame-bg"></div>
              
              <div className="hero-book-wrapper">
                <img
                  className="hero-book-img"
                  src={slide.image}
                  alt={slide.title}
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
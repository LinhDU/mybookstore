import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-fahasa-style py-5">
      <Container>
        <Row>
          <Col lg={4} md={12} className="footer-brand-section pe-lg-5">
            <div className="footer-logo mb-3">
              <h2 className="admin-logo" style={{ fontSize: '2.5rem' }}>NEVERLAND</h2>
            </div>
            <div className="footer-info-text">
              <p>Đ. Nghiêm Xuân Yêm, Đại Kim, Hoàng Mai, Hà Nội </p>
            </div>
          </Col>

          <Col lg={8} md={12}>
            <Row>
              <Col md={4} sm={6} className="footer-links-col">
                <h5 className="footer-heading">DỊCH VỤ</h5>
                <ul className="list-unstyled">
                  <li><Link to="/">Điều khoản sử dụng</Link></li>
                  <li><Link to="/">Chính sách bảo mật thông tin cá nhân</Link></li>
                  <li><Link to="/">Chính sách bảo mật thanh toán</Link></li>
                </ul>
              </Col>

              <Col md={4} sm={6} className="footer-links-col">
                <h5 className="footer-heading">HỖ TRỢ</h5>
                <ul className="list-unstyled">
                  <li><Link to="/">Chính sách đổi - trả - hoàn tiền</Link></li>
                  <li><Link to="/">Chính sách bảo hành - bồi hoàn</Link></li>
                  <li><Link to="/">Chính sách vận chuyển</Link></li>
                </ul>
              </Col>

              <Col md={4} sm={6} className="footer-links-col">
                <h5 className="footer-heading">TÀI KHOẢN CỦA TÔI</h5>
                <ul className="list-unstyled">
                  <li><Link to="/">Đăng nhập/Tạo mới tài khoản</Link></li>
                  <li><Link to="/">Chi tiết tài khoản</Link></li>
                  <li><Link to="/">Lịch sử mua hàng</Link></li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
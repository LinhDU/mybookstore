import React, { useState, useEffect, useContext } from 'react'; // Gộp useContext vào đây
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Tabs, Tab, Row, Col, Spinner } from 'react-bootstrap';
import { ChevronUp, ChevronDown, ShoppingCart } from 'lucide-react';
import defaultBook from '../assets/default-book.png'; 
import { FavoritesContext } from './FavoritesContext'; // Đảm bảo đúng đường dẫn file

const BookDetail = () => {
  const { id } = useParams(); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    window.scrollTo(0, 0); 
    setLoading(true);
    
    axios.get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        // Backend trả về res.data.data hoặc res.data
        setBook(res.data.data || res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi lấy chi tiết sách:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  if (!book) return <div className="text-center py-5">Không tìm thấy sách!</div>;
  const bookId = book._id || book.id;
  const isBookFavorite = isFavorite(bookId);

  return (
    <div className="book-detail-page">
      {/* PHẦN 1: THÔNG TIN CƠ BẢN */}
      <section className="book-top-section py-5">
        <Container>
          <Row className="align-items-start">
            <Col lg={5} md={12} className="text-center mb-4 mb-lg-0">
              <div className="detail-image-wrapper">
                <img 
                  src={`http://localhost:5555/images/${book.image}`} 
                  alt={book.title} 
                  className="img-fluid shadow-lg main-book-img"
                  onError={(e) => (e.target.src = defaultBook)}
                />
              </div>
            </Col>
            
            <Col lg={7} md={12} className="ps-lg-5">
              <nav className="breadcrumb-nav mb-3">
                <small className="text-muted">Trang chủ / {book.category} / {book.title}</small>
              </nav>
              
              <h1 className="detail-book-title">{book.title}</h1>
              <p className="detail-author">Tác giả: <span>{book.author}</span></p>
              
              <h2 className="detail-price">
                {Number(book.price).toLocaleString()} VNĐ
              </h2>
              
              <div className="detail-short-desc">
                <p>{book.description}</p>
              </div>

              <div className="action-buttons d-flex gap-3 mt-4">
                <button className="btn-add-to-cart">
                  <ShoppingCart size={20} className="me-2" /> THÊM VÀO GIỎ HÀNG
                </button>
                <button 
                  className={`btn-wishlist-custom ${isBookFavorite ? 'active' : ''}`}
                  onClick={() => toggleFavorite(book)}
                >
                  {isBookFavorite ? '❤️' : '🤍'}
                </button>
              </div>

              <div className="extra-info-list mt-5 pt-4 border-top">
                <p><strong>Thể loại:</strong> {book.category}</p>
                <p><strong>Số trang:</strong> {book.pages} trang</p>
                <p><strong>Loại bìa:</strong> {book.coverType || "Bìa mềm"}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* PHẦN 2: CHI TIẾT SẢN PHẨM (Tabs) */}
      <section className="book-bottom-tabs py-5 bg-white">
        <Container>
          <Tabs defaultActiveKey="info" className="custom-detail-tabs mb-4">
            <Tab eventKey="info" title="MÔ TẢ SẢN PHẨM">
              <div className={`tab-content-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <div className="info-block mb-5">
                  <h6 className="block-subtitle">THÔNG TIN CHI TIẾT</h6>
                  <ul className="detail-specs">
                    <li><span>Nhà xuất bản:</span> {book.publisher}</li>
                    <li><span>Năm phát hành:</span> {book.pubDate}</li>
                  </ul>
                </div>

                <div className="info-block">
                  <h6 className="block-subtitle">NỘI DUNG</h6>
                  <div className="long-description-text">
                    <p style={{ whiteSpace: 'pre-line' }}>{book.longDescription || book.description}</p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-3">
                <button 
                  className="btn-toggle-content border-0 bg-transparent"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <>RÚT GỌN NỘI DUNG <ChevronUp size={18} /></>
                  ) : (
                    <>XEM THÊM NỘI DUNG <ChevronDown size={18} /></>
                  )}
                </button>
              </div>
            </Tab>

            <Tab eventKey="reviews" title="BÌNH LUẬN">
              <div className="py-5 text-center text-muted">
                Hiện chưa có bình luận nào cho cuốn sách này.
              </div>
            </Tab>
          </Tabs>
        </Container>
      </section>
    </div>
  );
};

export default BookDetail;
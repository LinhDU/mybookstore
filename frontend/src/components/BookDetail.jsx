import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { listBooks } from '../data';
import { Container, Tabs, Tab, Row, Col } from 'react-bootstrap';
import { ChevronUp, ChevronDown, ShoppingCart } from 'lucide-react';
import defaultBook from '../assets/default-book.png'; 

const BookDetail = () => {
  const { id } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Tìm cuốn sách
  const book = listBooks.find((item) => item.id === id);

  // Cuộn lên đầu trang khi vào trang chi tiết
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!book) return <div className="text-center py-5">Không tìm thấy sách!</div>;

  return (
    <div className="book-detail-page" style={{ fontByFamily: "'Be Vietnam Pro', sans-serif" }}>
      
      {/* PHẦN 1: THÔNG TIN CƠ BẢN (Giao diện bạn đã dựng) */}
      <div className="book-top-info py-5">
        <Container>
          <Row className="gap-lg-5">
            {/* Ảnh sản phẩm */}
            <Col lg={5} md={12} className="text-center">
              <div className="book-image-frame">
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="img-fluid shadow-lg" 
                  style={{ maxWidth: '400px', borderRadius: '4px' }}
                  onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultBook;
                  }}
                />
              </div>
            </Col>
            
            {/* Thông tin nhanh */}
            <Col lg={6} md={12} className="mt-4 mt-lg-0">
              <h1 className="fw-bold mb-1" style={{ fontSize: '2.5rem', color: '#222' }}>{book.title}</h1>
              <h5 className="text-muted mb-4 fw-normal">Tác giả: {book.author}</h5>
              
              <p className="price-tag mb-4" style={{ fontSize: '32px', color: '#B88E2F', fontWeight: 'bold' }}>
                ${book.price.toFixed(2)}
              </p>
              
              <div className="short-desc mb-4">
                <p style={{ color: '#666', lineHeight: '1.8' }}>{book.description}</p>
              </div>
              

              <div className="quick-specs pt-4" style={{ borderTop: '1px solid #eee' }}>
                <p className="mb-2"><strong>Thể loại:</strong> <span className="text-muted">{book.category}</span></p>
                <p className="mb-0"><strong>Số trang:</strong> <span className="text-muted">{book.pages} trang</span></p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* PHẦN 2: CHI TIẾT SẢN PHẨM (Tabs Description) */}
      <div className="book-bottom-detail bg-light py-5" style={{ borderTop: '1px solid #eee' }}>
        <Container>
          <Tabs defaultActiveKey="description" id="book-tabs" className="custom-detail-tabs mb-5">
            
            {/* TAB MÔ TẢ */}
            <Tab eventKey="description" title="MÔ TẢ SẢN PHẨM">
              <div className={`detail-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
                
                {/* Thông số kỹ thuật */}
                <div className="content-block">
                  <h6 className="block-title">THÔNG TIN SÁCH</h6>
                  <ul className="specs-list">
                    <li><span>Công ty phát hành:</span> {book.issuedBy || "Đang cập nhật"}</li>
                    <li><span>Nhà xuất bản:</span> {book.publisher || "Đang cập nhật"}</li>
                    <li><span>Ngày xuất bản:</span> {book.pubDate || "Đang cập nhật"}</li>
                    <li><span>Kích thước:</span> {book.size || "Đang cập nhật"}</li>
                    <li><span>Loại bìa:</span> {book.coverType || "Bìa mềm"}</li>
                  </ul>
                </div>

                {/* Nội dung chi tiết */}
                <div className="content-block mt-5">
                  <h6 className="block-title">NỘI DUNG</h6>
                  <p style={{ whiteSpace: 'pre-line' }}>
                    {book.longDescription || book.description}
                  </p>
                </div>

                {/* Đánh giá trích dẫn */}
                {book.reviews && (
                  <div className="content-block mt-5">
                    <h6 className="block-title">ĐÁNH GIÁ</h6>
                    {book.reviews.map((rev, idx) => (
                      <p key={idx} className="quote-text">
                        “{rev.text}” — <strong>{rev.source}</strong>
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Nút Xem thêm */}
              <div className="text-center mt-4">
                <button className="btn-toggle-view" onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? (
                    <>RÚT GỌN NỘI DUNG <ChevronUp size={18} /></>
                  ) : (
                    <>XEM THÊM NỘI DUNG <ChevronDown size={18} /></>
                  )}
                </button>
              </div>
            </Tab>

            <Tab eventKey="comments" title="BÌNH LUẬN VỀ SẢN PHẨM">
              <div className="py-5 text-center text-muted">
                Hiện tại chưa có bình luận nào cho cuốn sách này.
              </div>
            </Tab>
          </Tabs>
        </Container>
      </div>
    </div>
  );
};

export default BookDetail;
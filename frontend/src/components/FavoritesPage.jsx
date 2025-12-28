import { useContext } from 'react';
import { FavoritesContext } from './FavoritesContext';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Trash2, LogIn } from 'lucide-react';
import defaultBook from '../assets/default-book.png';

function FavoritesPage() {
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');

  if (!token) {
    return (
      <section className="featured-section py-5">
        <Container className="text-center py-5">
          <div className="mb-4">
            <LogIn size={64} color="#b38b59" className="mb-3" />
            <h2 className='featured-title'>Bạn chưa đăng nhập</h2>
            <p className="text-muted">Vui lòng đăng nhập tài khoản để xem và quản lý danh sách sách yêu thích của riêng bạn.</p>
          </div>
          <Button 
            variant="primary" 
            className="px-4 py-2"
            style={{ backgroundColor: '#b38b59', border: 'none' }}
            onClick={() => navigate('/login')}
          >
            Đăng nhập ngay
          </Button>
          <div className="mt-3">
            <Link to="/register" className="text-decoration-none" style={{ color: '#b38b59' }}>
              Chưa có tài khoản? Đăng ký tại đây
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="featured-section all-products-page py-5">
      <Container>
        <div className="text-center mb-5">
          <span className="featured-subtitle">DANH SÁCH CỦA TÔI</span>
          <h2 className='featured-title'>Sách yêu thích</h2>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">Danh sách yêu thích của bạn hiện đang trống.</p>
            <Link to="/products" className="btn-read-more mt-2 d-inline-block card-link ">Khám phá sách ngay</Link>
          </div>
        ) : (
          <Row className="g-4">
            {favorites.map(book => (
              <Col lg={3} md={4} sm={6} key={book._id} className="mb-4 position-relative">
                {/* NÚT XÓA NHANH */}
                <button 
                  className="btn-remove-wishlist"
                  title="Xóa khỏi danh sách yêu thích"
                  onClick={(e) => {
                    e.preventDefault(); 
                    e.stopPropagation();
                    removeFavorite(book._id);
                  }}
                  style={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '25px', 
                    zIndex: 10, 
                    border: 'none', 
                    background: 'white', 
                    borderRadius: '50%', 
                    width: '35px', 
                    height: '35px', 
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fff0f0'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <Trash2 size={16} color="#ff4d4d" />
                </button>

                <Link to={`/book/${book._id}`} className="book-card-link">
                  <div className="book-card text-center">
                    <div className="book-image-wrapper">
                      <img
                        src={book.image ? `http://localhost:5555/images/${book.image}` : defaultBook}
                        alt={book.title}
                        onError={(e) => (e.target.src = defaultBook)}
                      />
                    </div>
                    <h5 className="book-title">{book.title}</h5>
                    <p className="book-author">{book.author}</p>
                    <p className="book-price" style={{ color: '#b38b59', fontWeight: '700' }}>
                      {book.price ? Number(book.price).toLocaleString('vi-VN') : 0} VNĐ
                    </p>
                  </div>   
                </Link>                   
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
}

export default FavoritesPage;
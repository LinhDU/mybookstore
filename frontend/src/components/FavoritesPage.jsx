import { useContext } from 'react';
import { FavoritesContext } from './FavoritesContext';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { Trash2 } from 'lucide-react'; // Import icon xóa
import defaultBook from '../assets/default-book.png';

function FavoritesPage() {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <section className="featured-section all-products-page py-5">
      <Container>
        <div className="text-center mb-5">
          <span className="featured-subtitle">DANH SÁCH CỦA TÔI</span>
          <h2 className='featured-title'>Sách yêu thích</h2>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">Bạn chưa có sách yêu thích nào.</p>
            <Link to="/products" className="btn-read-more mt-2 d-inline-block">Khám phá sách ngay</Link>
          </div>
        ) : (
          <Row className="g-4">
            {favorites.map(book => (
              <Col lg={3} md={4} sm={6} key={book._id} className="mb-4 position-relative">
                {/* NÚT XÓA NHANH */}
                <button 
                  className="btn-remove-wishlist"
                  onClick={() => removeFavorite(book._id)}
                  style={{ position: 'absolute', top: '10px', right: '20px', zIndex: 10, border: 'none', background: 'white', borderRadius: '50%', width: '35px', height: '35px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
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
                      {book.price ? Number(book.price).toLocaleString() : 0} VNĐ
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
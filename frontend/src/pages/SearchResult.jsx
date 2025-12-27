import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios"; // Khuyên dùng axios cho đồng bộ với các trang khác
import defaultBook from '../assets/default-book.png';

function SearchResult() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!keyword) {
      setBooks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    // Gọi API tìm kiếm
    axios.get(`http://localhost:5555/books?q=${encodeURIComponent(keyword)}`)
      .then(res => {
        // Lưu ý: Backend của bạn cần xử lý query 'q' để lọc dữ liệu
        const data = res.data.data || res.data;
        setBooks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi tìm kiếm:", err);
        setLoading(false);
      });

  }, [keyword]);

  return (
  <section className="featured-section all-products-page">
    <Container>
      {/* 1. Nếu đang tải: Chỉ hiện Spinner */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="warning" />
          <p className="mt-3 text-muted">Đang tìm kiếm trong kho sách...</p>
        </div>
      ) : (
        /* 2. Nếu đã tải xong: Hiện kết quả */
        <>
          <div className="mb-5">
            <span className="featured-subtitle">KẾT QUẢ TÌM KIẾM</span>
            <h2 className="featured-title">"{keyword}"</h2>
            {/* Chỉ hiện số lượng khi đã tải xong */}
            <p className="text-muted">Tìm thấy {books.length} cuốn sách phù hợp</p>
          </div>

          {books.length === 0 ? (
            <div className="text-center py-5 bg-light">
              <p>Rất tiếc, không tìm thấy sách phù hợp.</p>
            </div>
          ) : (
            <Row>
              {books.map(book => (
                <Col lg={3} md={6} key={book._id} className="mb-5">
                   <Link to={`/book/${book._id}`} className="book-card-link">
                      <div className="book-card text-center">
                        <div className="book-image-wrapper">
                          <img src={book.image ? `http://localhost:5555/images/${book.image}` : "/default-book.png"} alt={book.title} onError={(e) => (e.target.src = defaultBook)} />
                        </div>
                        <h5 className="book-title">{book.title}</h5>
                        <p className="text-muted mb-1">{book.author}</p>
                        <p className="fw-bold text-danger">{Number(book.price).toLocaleString()} VNĐ</p>
                      </div>
                   </Link>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </Container>
  </section>
);
}

export default SearchResult;
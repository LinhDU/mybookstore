import { useParams } from 'react-router-dom';
import { listBooks } from '../data'; // Import data giả ở bước 1

const BookDetail = () => {
  const { id } = useParams(); // Lấy ID từ thanh địa chỉ (ví dụ: /book/1)
  
  // Tìm cuốn sách có ID trùng với ID trên thanh địa chỉ
  const book = listBooks.find((item) => item.id === id);

  if (!book) return <div>Không tìm thấy sách!</div>;

  return (
    <div className="book-detail-container" style={{ display: 'flex', padding: '50px', gap: '40px' }}>
      <div className="book-image" style={{ flex: 1 }}>
        <img src={book.image} alt={book.title} style={{ width: '100%' }} />
      </div>
      
      <div className="book-info" style={{ flex: 1.5 }}>
        <h1>{book.title}</h1>
        <h3 style={{ color: 'gray' }}>Tác giả: {book.author}</h3>
        <p style={{ fontSize: '24px', color: '#B88E2F', fontWeight: 'bold' }}>${book.price}</p>
        <p>{book.description}</p>
        <button>Thêm vào giỏ hàng</button>
        <div style={{ marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '10px' }}>
          <p>Thể loại: {book.category}</p>
          <p>Số trang: {book.pages}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
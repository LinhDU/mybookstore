import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Container, Card } from 'react-bootstrap';

const AdminFeatured = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:5555/books').then(res => setBooks(res.data.data));
  };

  const handleStatusChange = async (id, field, value) => {
    try {
      await axios.patch(`http://localhost:5555/books/status/${id}`, { [field]: value });
      fetchBooks(); // Load lại dữ liệu
    } catch (error) {
      alert("Lỗi khi cập nhật trạng thái");
    }
  };

  return (
    <Container className="py-4">
      <h3 className="admin-logo mb-4">CẤU HÌNH TRANG CHỦ</h3>
      <Card className="admin-card">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Tên sách</th>
              <th className="text-center">Banner</th>
              <th className="text-center">Sách nổi bật</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td className="text-center">
                  <Form.Check 
                    type="switch"
                    checked={book.isHero}
                    onChange={(e) => handleStatusChange(book._id, 'isHero', e.target.checked)}
                  />
                </td>
                <td className="text-center">
                  <Form.Check 
                    type="switch"
                    checked={book.isFeatured}
                    onChange={(e) => handleStatusChange(book._id, 'isFeatured', e.target.checked)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default AdminFeatured;
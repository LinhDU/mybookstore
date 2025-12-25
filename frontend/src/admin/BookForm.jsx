import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Row, Col, Card, Image } from "react-bootstrap";
import { Camera, Save, XCircle } from "lucide-react"; // Cài lucide-react nếu chưa có
import axios from "axios";

const BookForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState(null); // Để xem trước ảnh

  const [book, setBook] = useState({
    title: "", author: "", price: "", category: "", pages: "",
    publisher: "", issuedBy: "", pubDate: "", size: "",
    coverType: "", description: "", longDescription: "", image: null
  });

  useEffect(() => {
  if (id) {
    fetch(`http://localhost:5555/books/${id}`)
      .then(res => res.json())
      .then(res => {
        setBook(res.data);
        if (res.data.image) {
          setPreview(`http://localhost:5555/images/${res.data.image}`);
        }
      })
      .catch(err => console.error(err));
  }
}, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBook({ ...book, image: file });
      setPreview(URL.createObjectURL(file)); // Tạo đường dẫn tạm để xem ảnh
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  Object.keys(book).forEach((key) => {
    if (book[key]) {
      formData.append(key, book[key]);
    }
  });

  try {
    if (id) {
      await axios.put(`http://localhost:5555/books/${id}`, formData);
    } else {
      await axios.post(`http://localhost:5555/books`, formData);
    }
    navigate("/admin/books");
  } catch (error) {
    console.error("Lỗi lưu sách:", error);
  }
};


  return (
    <div className="admin-form-container">
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="admin-page-title">
            {id ? "Chỉnh sửa thông tin sách" : "Thêm sách mới vào kho"}
          </h2>
          
        </div>

        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Cột trái: Thông tin chính */}
            <Col lg={8}>
              <Card className="form-card mb-4">
                <Card.Body>
                  <h5 className="form-section-title">Thông tin cơ bản</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Tên tiêu đề sách</Form.Label>
                    <Form.Control
                      name="title"
                      placeholder="VD: Không Gia Đình"
                      value={book.title}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Tác giả</Form.Label>
                        <Form.Control
                          name="author"
                          placeholder="Tên tác giả..."
                          value={book.author}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Thể loại</Form.Label>
                        <Form.Control
                          name="category"
                          placeholder="Kỹ năng, Tiểu thuyết..."
                          value={book.category}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Giá bán (VNĐ)</Form.Label>
                        <Form.Control
                          type="number"
                          name="price"
                          value={book.price}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Số trang</Form.Label>
                        <Form.Control
                          type="number"
                          name="pages"
                          value={book.pages}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Loại bìa</Form.Label>
                        <Form.Select name="coverType" value={book.coverType} onChange={handleChange}>
                          <option value="">Chọn loại bìa</option>
                          <option value="Bìa mềm">Bìa mềm</option>
                          <option value="Bìa cứng">Bìa cứng</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card className="form-card mb-4">
                <Card.Body>
                  <h5 className="form-section-title">Chi tiết xuất bản & Mô tả</h5>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Nhà xuất bản</Form.Label>
                        <Form.Control name="publisher" value={book.publisher} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Ngày phát hành</Form.Label>
                        <Form.Control type="date" name="pubDate" value={book.pubDate} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Mô tả ngắn</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="description"
                      value={book.description}
                      onChange={handleChange}
                      placeholder="Hiển thị ở danh sách ngoài..."
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Mô tả chi tiết</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      name="longDescription"
                      value={book.longDescription}
                      onChange={handleChange}
                      placeholder="Nội dung đầy đủ của sách..."
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>

            {/* Cột phải: Ảnh và Action */}
            <Col lg={4}>
              <Card className="form-card mb-4">
                <Card.Body className="text-center">
                  <h5 className="form-section-title text-start">Hình ảnh bìa</h5>
                  <div className="image-upload-area mb-3">
                    {preview ? (
                      <Image src={preview} fluid className="preview-img mb-3" />
                    ) : (
                      <div className="upload-placeholder">
                        <Camera size={40} className="text-muted mb-2" />
                        <p className="small text-muted">Chưa có ảnh</p>
                      </div>
                    )}
                    <Form.Control
                      type="file"
                      id="file-upload"
                      className="d-none"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="file-upload" className="btn btn-outline-primary btn-sm w-100">
                      Chọn ảnh từ máy tính
                    </label>
                  </div>
                </Card.Body>
              </Card>

              <Card className="form-card sticky-top" style={{ top: '20px' }}>
                <Card.Body>
                  <h5 className="form-section-title">Hành động</h5>
                  <p className="small text-muted">Đảm bảo các thông tin đã chính xác trước khi lưu.</p>
                  <Button type="submit" className="btn-admin-save w-100 mb-2 py-2">
                    <Save size={18} className="me-2" /> 
                    {id ? "Lưu thay đổi" : "Đăng sách ngay"}
                  </Button>
                  <Button variant="light" className="w-100 py-2" onClick={() => navigate(-1)}>
                    Hủy bỏ
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default BookForm;
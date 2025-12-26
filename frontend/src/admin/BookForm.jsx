import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Row, Col, Card, Image } from "react-bootstrap";
import { Camera, Save, XCircle } from "lucide-react";
import axios from "axios";

const BookForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy ID từ URL
  const [preview, setPreview] = useState(null); // Quản lý ảnh xem trước

  // Khởi tạo State với các trường khớp hoàn toàn với Schema Backend
  const [book, setBook] = useState({
    title: "", author: "", price: "", category: "", pages: "",
    publisher: "", issuedBy: "", pubDate: "", size: "",
    coverType: "", description: "", longDescription: "", image: null
  });

  // ===== BƯỚC 1: LẤY DỮ LIỆU CŨ KHI Ở CHẾ ĐỘ SỬA =====
 useEffect(() => {
  if (id) {
    console.log("Đang lấy dữ liệu cho ID:", id); // Kiểm tra xem ID có đúng không
    
    axios.get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        console.log("Dữ liệu thô từ Server:", res.data); // XEM DÒNG NÀY TRONG CONSOLE (F12)

        // Kiểm tra xem dữ liệu nằm ở đâu (res.data hay res.data.data)
        const fetchedBook = res.data.data || res.data;

        if (fetchedBook) {
          setBook({
            ...fetchedBook,
            // Đảm bảo năm phát hành là số để hiện lên ô input number
            pubDate: fetchedBook.pubDate || ""
          });

          // Hiển thị ảnh cũ nếu có
          if (fetchedBook.image) {
            // Nếu image là link full thì để nguyên, nếu là tên file thì cộng chuỗi
            const imagePath = fetchedBook.image.startsWith('http') 
              ? fetchedBook.image 
              : `http://localhost:5555/images/${fetchedBook.image}`;
            setPreview(imagePath);
          }
        }
      })
      .catch((err) => {
        console.error("Lỗi lấy dữ liệu:", err);
        alert("Không tìm thấy thông tin sách này!");
      });
  }
}, [id]);

  // ===== BƯỚC 2: CẬP NHẬT STATE KHI NHẬP LIỆU (TWO-WAY BINDING) =====
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBook({ ...book, image: file }); // Lưu file vào state để upload
      setPreview(URL.createObjectURL(file)); // Tạo link tạm để xem trước
    }
  };

  // ===== BƯỚC 3: GỬI DỮ LIỆU LÊN SERVER =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Đưa tất cả dữ liệu vào FormData
    Object.keys(book).forEach((key) => {
      if (key === 'image') {
        // Chỉ gửi file lên nếu người dùng có chọn ảnh mới (image là 1 Object File)
        if (book[key] instanceof File) {
          formData.append('image', book[key]);
        }
      } else if (book[key] !== null && book[key] !== undefined) {
        formData.append(key, book[key]);
      }
    });

    try {
      if (id) {
        // Chế độ Sửa (PUT)
        await axios.put(`http://localhost:5555/books/${id}`, formData);
        alert("Cập nhật sách thành công!");
      } else {
        // Chế độ Thêm mới (POST)
        await axios.post(`http://localhost:5555/books`, formData);
        alert("Thêm sách mới thành công!");
      }
      navigate("/admin/books");
    } catch (error) {
      console.error("Lỗi lưu dữ liệu:", error);
      alert("Lỗi! Không thể lưu thông tin.");
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
            {/* Cột trái: Form nhập liệu */}
            <Col lg={8}>
              <Card className="form-card mb-4 shadow-sm">
                <Card.Body>
                  <h5 className="form-section-title">Thông tin cơ bản</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Tên tiêu đề sách</Form.Label>
                    <Form.Control
                      name="title"
                      value={book.title || ""} // QUAN TRỌNG: Gắn giá trị từ State
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Tác giả</Form.Label>
                        <Form.Control name="author" value={book.author || ""} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Thể loại</Form.Label>
                        <Form.Control name="category" value={book.category} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Giá bán (VNĐ)</Form.Label>
                        <Form.Control type="number" name="price" value={book.price} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Số trang</Form.Label>
                        <Form.Control type="number" name="pages" value={book.pages} onChange={handleChange} />
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

              <Card className="form-card mb-4 shadow-sm">
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
                        <Form.Label>Năm xuất bản</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="pubDate" 
                          placeholder="VD: 2024"
                          value={book.pubDate || ""} 
                          onChange={handleChange} 
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Mô tả ngắn</Form.Label>
                    <Form.Control as="textarea" rows={2} name="description" value={book.description} onChange={handleChange} />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Mô tả chi tiết</Form.Label>
                    <Form.Control as="textarea" rows={6} name="longDescription" value={book.longDescription} onChange={handleChange} />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>

            {/* Cột phải: Ảnh và Nút lưu */}
            <Col lg={4}>
              <Card className="form-card mb-4 shadow-sm text-center">
                <Card.Body>
                  <h5 className="form-section-title text-start">Hình ảnh bìa</h5>
                  <div className="image-upload-area mb-3">
                    {preview ? (
                      <Image src={preview} fluid className="preview-img mb-3" />
                    ) : (
                      <div className="upload-placeholder py-5">
                        <Camera size={40} className="text-muted mb-2" />
                        <p className="small text-muted">Chưa có ảnh</p>
                      </div>
                    )}
                    <Form.Control type="file" id="file-upload" className="d-none" accept="image/*" onChange={handleImageChange} />
                    <label htmlFor="file-upload" className="btn btn-outline-primary btn-sm w-100">
                      {preview ? "Thay đổi ảnh" : "Chọn ảnh bìa"}
                    </label>
                  </div>
                </Card.Body>
              </Card>

              <Card className="form-card sticky-top shadow-sm" style={{ top: '20px' }}>
                <Card.Body>
                  <h5 className="form-section-title">Hành động</h5>
                  <Button type="submit" className="btn-admin-save w-100 mb-2 py-2">
                    <Save size={18} className="me-2" /> 
                    {id ? "Lưu thay đổi" : "Đăng sách ngay"}
                  </Button>
                  <Button variant="light" className="w-100 py-2" onClick={() => navigate(-1)}>Hủy bỏ</Button>
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
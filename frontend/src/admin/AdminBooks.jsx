import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminBooks() {
  const [books, setBooks] = useState([]); // Khởi tạo mảng rỗng
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const navigate = useNavigate();

  // Lấy danh sách sách từ Backend
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books`)
      .then((res) => {
        console.log("Dữ liệu nhận được từ Server:", res.data); // Dòng này cực kỳ quan trọng để debug

        // Kiểm tra: Nếu backend trả về { data: [...] }
        if (res.data && res.data.data) {
          setBooks(res.data.data);
        } 
        // Nếu backend trả về mảng trực tiếp [...]
        else if (Array.isArray(res.data)) {
          setBooks(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa cuốn sách này không?")) {
      axios.delete(`http://localhost:5555/books/${id}`)
        .then(() => {
          // Xóa thành công thì lọc mảng dựa trên _id
          setBooks((prevBooks) => prevBooks.filter((b) => b._id !== id));
          alert("Đã xóa thành công!");
        })
        .catch((err) => {
          console.error("Lỗi khi xóa:", err);
          alert("Không thể xóa sách, vui lòng thử lại.");
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Quản lý kho sách</h3>
        <button className="btn btn-primary shadow-sm" onClick={() => navigate("/admin/books/add")}>
          ➕ Thêm sách mới
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-bordered bg-white shadow-sm">
          <thead className="table-light">
            <tr>
              <th style={{ width: "10%" }}>Mã (ID)</th>
              <th style={{ width: "45%" }}>Tên sách</th>
              <th style={{ width: "20%" }}>Giá bán</th>
              <th style={{ width: "25%" }} className="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-4">Đang tải dữ liệu...</td>
              </tr>
            ) : books.length > 0 ? (
              books.map((book) => (
                <tr key={book._id}>
                  <td className="text-muted">
                    {book._id ? `${book._id.substring(0, 8)}...` : "N/A"}
                  </td>
                  <td className="fw-bold">{book.title}</td>
                  <td className="text-danger fw-bold">
                    {Number(book.price || 0).toLocaleString()} VNĐ
                  </td>
                  <td className="text-center">
                    <button 
                      className="btn btn-sm btn-warning me-2 px-3"
                      onClick={() => navigate(`/admin/books/edit/${book._id}`)}
                    >
                      Sửa
                    </button>
                    <button 
                      className="btn btn-sm btn-danger px-3"
                      onClick={() => handleDelete(book._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-muted">
                  Chưa có quyển sách nào trong kho.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBooks;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import defaultBook from "../assets/default-book.png";

const AllProducts = () => {
  // 1. Luôn khởi tạo là mảng rỗng
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        // 2. Kiểm tra dữ liệu cực kỳ cẩn thận trước khi setBooks
        if (res.data && res.data.data) {
          // Trường hợp Backend trả về { data: [...] }
          setBooks(res.data.data);
        } else if (Array.isArray(res.data)) {
          // Trường hợp Backend trả về mảng trực tiếp [...]
          setBooks(res.data);
        } else {

          setBooks([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi kết nối API:", err);
        setBooks([]);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ backgroundColor: "#f8f6f1", minHeight: "100vh" }}>
      <div className="container py-5">
        <h2 className="text-center mb-5">Tất cả sản phẩm</h2>
        <div className="row g-4">
          {loading ? (
            <div className="text-center">Đang tải danh sách sách...</div>
          ) : (books && books.length > 0) ? ( 
            books.map((book) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={book._id}>
                <div
                  className="card h-100 border-0 shadow-sm text-center"
                  style={{ cursor: "pointer", transition: "0.3s" }}
                  onClick={() => navigate(`/detail/${book._id}`)}
                >
                  <div style={{ backgroundColor: "#f1efe9", padding: "20px" }}>
                    <img
                      src={
                        book.image
                          ? `http://localhost:5555/images/${book.image}`
                          : defaultBook
                      }
                      alt={book.title}
                      onError={(e) => (e.target.src = defaultBook)}
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="fw-bold mt-2 text-truncate">{book.title}</h5>
                    <p className="text-muted mb-1">{book.author}</p>
                    <p className="fw-bold text-danger">
                      {book.price ? Number(book.price).toLocaleString() : 0} VNĐ
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted">Không tìm thấy sản phẩm nào.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
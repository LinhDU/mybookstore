import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { listBooks as initialBooks } from "../data";

function AdminBooks() {
  const [books, setBooks] = useState(initialBooks);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa?")) {
      setBooks(books.filter((b) => b.id !== id));
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <h3>Quản lý sách</h3>
        <button
          className="btn btn-light"
          onClick={() => navigate("/admin/books/add")}
        >
          ➕ Thêm sách
        </button>
      </div>

      <table className="table table-bordered bg-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sách</th>
            <th>Giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>${book.price}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() =>
                    navigate(`/admin/books/edit/${book.id}`)
                  }
                >
                  Sửa
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(book.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AdminBooks;

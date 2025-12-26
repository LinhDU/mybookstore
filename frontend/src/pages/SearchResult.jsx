import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

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

    fetch(`http://localhost:5555/books?q=${encodeURIComponent(keyword)}`)
      .then(res => res.json())
      .then(data => {
        console.log("SEARCH API RESULT:", data);
        setBooks(data.data || []);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

  }, [keyword]);

  return (
    <div className="container mt-5">
      <h4>Kết quả tìm kiếm cho: "{keyword}"</h4>

      {loading ? (
        <p>Đang tìm sách...</p>
      ) : books.length === 0 ? (
        <p>Không tìm thấy sách</p>
      ) : (
        <div className="row mt-3">
          {books.map(book => (
            <div key={book._id} className="col-md-3 mb-3">
              <div className="card p-3 h-100">

                {book.image && (
                  <img
                    src={`http://localhost:5555/images/${book.image}`}
                    alt={book.title}
                    className="img-fluid mb-2"
                  />
                )}

                <h6>{book.title}</h6>
                <small>{book.author}</small>

                <Link
                  to={`/book/${book._id}`}
                  className="btn btn-sm btn-outline-dark mt-2"
                >
                  Xem chi tiết
                </Link>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResult;

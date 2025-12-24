import { useNavigate } from "react-router-dom";
import { listBooks } from "../data";
import defaultBook from "../assets/default-book.png";

function AllProducts() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#f8f6f1", minHeight: "100vh" }}>
      <div className="container py-5">

        <div className="row g-4">
          {listBooks.map((book) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={book.id}>
              
              {/* CARD CLICKABLE */}
              <div
                className="text-center h-100"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <div
                  style={{
                    backgroundColor: "#f1efe9",
                    padding: "20px"
                  }}
                >
                  <img
                    src={book.image || defaultBook}
                    alt={book.title}
                    onError={(e) => (e.target.src = defaultBook)}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover"
                    }}
                  />
                </div>

                <h5 className="fw-serif mt-3">{book.title}</h5>
                <p className="text-muted mb-1">{book.author}</p>
                <p className="price">${book.price.toFixed(2)}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllProducts;

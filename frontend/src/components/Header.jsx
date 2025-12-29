import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaShoppingCart, FaUser } from "react-icons/fa";

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const [keyword, setKeyword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && keyword.trim() !== "") {
      e.preventDefault();
      navigate(`/search?q=${keyword}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="booksaw-navbar py-3">
      <Container fluid className="px-5">
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-2">
          NEVERLAND
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto fs-5" navbarScroll>
            <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
            <Nav.Link as={Link} to="/products">Thư viện</Nav.Link>
            <Nav.Link as={Link} to="/new-books">Sách mới</Nav.Link>
            <Nav.Link as={Link} to="/favorites">Sách yêu thích</Nav.Link>
            <NavDropdown title="Thể loại">
              <NavDropdown.Item as={Link} to="/category/Tiểu thuyết">
                Tiểu thuyết
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/Hồi Ký - Tuỳ Bút">
                Hồi Ký - Tuỳ Bút
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/Ngôn tình">
                Ngôn tình
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/Ngôn tình - Trinh thám">
                Ngôn tình - Trinh thám
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="d-flex align-items-center gap-3">
            <Form.Control
              type="search"
              placeholder="Tìm sách..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleSearch}
              style={{ width: "220px" }}
            />

            <Button variant="outline-dark">
              <FaShoppingCart size={20} />
            </Button>

            {user ? (
              <NavDropdown
                title={
                  <span>
                    <FaUser size={14} className="me-1" />
                    {user.name}
                  </span>
                }
                id="user-dropdown"
                className="fw-semibold"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button variant="light" onClick={() => navigate('/login')}>
                <FaUser /> Đăng nhập
              </Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
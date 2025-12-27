import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaShoppingCart, FaUser } from "react-icons/fa";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && keyword.trim() !== "") {
      e.preventDefault();
      navigate(`/search?q=${keyword}`);
    }
  };

  return (
    <Navbar expand="lg" className="booksaw-navbar py-3">
      <Container fluid className="px-5">

        {/* LOGO */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-2">
          NEVERLAND
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>

          {/* MENU */}
          <Nav className="mx-auto fs-5">
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

          {/* SEARCH */}
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

            <Button variant="light">
              <FaUser /> Đăng nhập
            </Button>
          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

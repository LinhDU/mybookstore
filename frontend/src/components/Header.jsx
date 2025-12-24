import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaShoppingCart, FaUser } from "react-icons/fa";

function Header() {
  return (
    <Navbar expand="lg" className="booksaw-navbar py-3">
      <Container fluid className="px-5">
        
        {/* LOGO – BÊN TRÁI */}
        <Navbar.Brand href="http://localhost:5173/#" className="fw-bold fs-2">
          NEVERLAND
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>

          {/* MENU – Ở GIỮA */}
          <Nav className="mx-auto fs-5">
            <Nav.Link href="http://localhost:5173/#">Trang chủ</Nav.Link>
            <Nav.Link href="#">Danh mục</Nav.Link>
            <Nav.Link href="#">Sách mới</Nav.Link>
            <Nav.Link href="#">Khuyến mãi</Nav.Link>
            <NavDropdown title="Thể loại">
              <NavDropdown.Item>Văn học</NavDropdown.Item>
              <NavDropdown.Item>Kỹ năng</NavDropdown.Item>
              <NavDropdown.Item>Công nghệ</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* SEARCH + ICON – BÊN PHẢI */}
          <Form className="d-flex align-items-center gap-3">
            <Form.Control
              type="search"
              placeholder="Tìm sách..."
              className="me-2"
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

// src/components/TopbarComponent.js
import React, { useState } from "react";
import { Navbar, Container, Button, Dropdown, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

function TopbarComponent({ user, onLogout }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    if (onLogout) onLogout();
  };

  const goToRolePage = () => {
    if (!user || !user.role) return;
    if (user.role === "admin") navigate("/admin");
    else if (user.role === "teacher") navigate("/teacher");
    else if (user.role === "student") navigate("/student");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Đang tìm kiếm: ${searchQuery}`);
    // navigate(`/search?q=${encodeURIComponent(searchQuery)}`); // Future feature
  };

  return (
    <Navbar bg="light" className="px-4 py-2 border-bottom">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <Navbar.Brand className="text-orange fw-bold">Học Lập Trình Để Đi Làm</Navbar.Brand>

        <Form onSubmit={handleSearch} className="d-flex align-items-center flex-grow-1 justify-content-center mx-3" style={{ maxWidth: "600px" }}>
          <div className="input-group" style={{ width: "100%" }}>
            <button className="input-group-text bg-white border-end-0" type="submit">
              <BiSearch />
            </button>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm khóa học, bài viết, video..."
              className="border-start-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Form>

        <div className="d-flex align-items-center">
          {user ? (
            <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)} align="end">
              <Dropdown.Toggle variant="light" id="dropdown-user" className="d-flex align-items-center">
                <i className="bi bi-person-circle me-2"></i>
                {user.email}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Header className="fw-bold">{user.email}</Dropdown.Header>
                <Dropdown.Item onClick={goToRolePage}>Trang cá nhân</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="text-danger">
                  Đăng xuất
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div className="d-flex">
              <Button variant="outline-primary" className="me-2" onClick={() => navigate("/login")}>Đăng nhập</Button>
              <Button variant="primary" onClick={() => navigate("/register")}>Đăng ký</Button>
            </div>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default TopbarComponent;

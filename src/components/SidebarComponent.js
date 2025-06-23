// src/components/SidebarComponent.js
import React from "react";
import { Nav } from "react-bootstrap";
import { HouseFill, Map, FileEarmarkText, GearFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function SidebarComponent() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      className="sidebar bg-white shadow-sm p-3"
      style={{ width: "220px", minHeight: "100vh", position: "sticky", top: 0 }}
    >
      <h5 className="mb-4 text-orange fw-bold">F8</h5>

      <Nav className="flex-column">
        <Nav.Link onClick={() => navigate("/homepage")} className="d-flex align-items-center mb-3 text-dark">
          <HouseFill className="me-2" /> Trang chủ
        </Nav.Link>
        <Nav.Link onClick={() => navigate("/roadmap")} className="d-flex align-items-center mb-3 text-dark">
          <Map className="me-2" /> Lộ trình
        </Nav.Link>
        <Nav.Link onClick={() => navigate("/articles")} className="d-flex align-items-center mb-3 text-dark">
          <FileEarmarkText className="me-2" /> Bài viết
        </Nav.Link>

        {user?.role === "admin" && (
          <Nav.Link onClick={() => navigate("/admin")} className="d-flex align-items-center mt-4 text-dark fw-bold">
            <GearFill className="me-2" /> Quản lý người dùng
          </Nav.Link>
        )}
      </Nav>
    </div>
  );
}

export default SidebarComponent;

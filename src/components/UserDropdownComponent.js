// src/components/UserDropdownComponent.js
import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UserDropdownComponent({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const goToRolePage = () => {
    if (!user || !user.role) return;
    if (user.role === "admin") navigate("/admin");
    else if (user.role === "teacher") navigate("/teacher");
    else if (user.role === "student") navigate("/student");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="position-relative">
      <Button variant="light" onClick={() => setShowMenu(!showMenu)}>
        <i className="bi bi-person-circle me-2"></i>
        {user.email}
      </Button>
      {showMenu && (
        <div className="position-absolute bg-white border rounded shadow p-3 mt-2 end-0" style={{ zIndex: 999 }}>
          <p className="mb-1 fw-bold">{user.email}</p>
          <hr className="my-2" />
          <Button variant="outline-primary" size="sm" className="w-100 mb-2" onClick={goToRolePage}>
            Trang cá nhân
          </Button>
          <Button variant="outline-danger" size="sm" className="w-100" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </div>
      )}
    </div>
  );
}

export default UserDropdownComponent;

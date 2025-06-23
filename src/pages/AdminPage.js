import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import { API } from "../utils/api";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      alert("Bạn không có quyền truy cập trang này!");
      navigate("/homepage");
    }
  }, []);

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  const openModal = (user = null) => {
    setEditingUser(user);
    setFormData(user || { email: "", password: "", role: "student" });
    setError("");
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      await API.delete(`/users/${id}`);
      fetchUsers();
    }
  };

  const handleSave = async () => {
  setError("");

  const emailRegex = /^[^\s@]+@gmail\.com$/;
  const { email, password } = formData;

  if (!emailRegex.test(email)) {
    setError("Email phải đúng định dạng @gmail.com");
    return;
  }

  if (password.length < 8 || password.length > 20) {
    setError("Mật khẩu phải từ 8 đến 20 ký tự.");
    return;
  }

  try {
    const check = await API.get(`/users?email=${email}`);

    // Nếu đang thêm mới (chưa có editingUser) và email đã tồn tại
    if (!editingUser && check.data.length > 0) {
      setError("Email này đã tồn tại. Vui lòng dùng email khác.");
      return;
    }

    // Nếu đang sửa và nhập email đã tồn tại nhưng khác ID
    if (editingUser && check.data.length > 0 && check.data[0].id !== editingUser.id) {
      setError("Email này đã được dùng bởi người khác.");
      return;
    }

    if (editingUser) {
      await API.put(`/users/${editingUser.id}`, formData);
    } else {
      await API.post("/users", formData);
    }

    setShowModal(false);
    setEditingUser(null);
    fetchUsers();
  } catch (err) {
    setError("Lỗi kết nối hoặc xử lý người dùng.");
  }
};

  return (
    <div className="container mt-4">
      <h3>Quản lý người dùng</h3>
      <Button className="mb-3" onClick={() => openModal()}>Thêm người dùng</Button>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <Button size="sm" variant="warning" onClick={() => openModal(u)}>Sửa</Button>{" "}
                <Button size="sm" variant="danger" onClick={() => handleDelete(u.id)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Mật khẩu (8–20 ký tự)</Form.Label>
            <Form.Control
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Vai trò</Form.Label>
            <Form.Select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Hủy</Button>
          <Button variant="primary" onClick={handleSave}>Lưu</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminPage;

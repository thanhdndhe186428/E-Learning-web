import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Card,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/api";
import { BiShow, BiHide } from "react-icons/bi";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState("");

  const togglePassword = () => setShowPass(!showPass);
  const toggleConfirmPassword = () => setShowConfirmPass(!showConfirmPass);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password, confirmPassword, role } = formData;

    if (!email.endsWith("@gmail.com")) {
      setError("Email phải có định dạng @gmail.com");
      return;
    }

    if (password.length < 8 || password.length > 20) {
      setError("Mật khẩu phải từ 8 đến 20 ký tự");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp");
      return;
    }

    try {
      const check = await API.get(`/users?email=${email}`);
      if (check.data.length > 0) {
        setError("Email đã tồn tại.");
        return;
      }

      const newUser = { email, password, role };
      await API.post("/users", newUser);
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      setError("Đã có lỗi xảy ra khi đăng ký.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h3 className="text-center mb-4">Đăng ký</h3>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Nhập email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <InputGroup>
                    <Form.Control
                      name="password"
                      type={showPass ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <Button variant="outline-secondary" onClick={togglePassword}>
                      {showPass ? <BiHide /> : <BiShow />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nhập lại mật khẩu</Form.Label>
                  <InputGroup>
                    <Form.Control
                      name="confirmPassword"
                      type={showConfirmPass ? "text" : "password"}
                      placeholder="Nhập lại mật khẩu"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <Button variant="outline-secondary" onClick={toggleConfirmPassword}>
                      {showConfirmPass ? <BiHide /> : <BiShow />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Vai trò</Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="student">Học sinh</option>
                    <option value="teacher">Giáo viên</option>                   
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Đăng ký
                </Button>

                <p className="mt-3 text-center">
                  Đã có tài khoản? <a href="/login">Đăng nhập</a>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;

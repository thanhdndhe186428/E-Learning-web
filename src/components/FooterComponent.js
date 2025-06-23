import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function FooterComponent() {
  return (
    <footer className="bg-dark text-light py-5 mt-auto">
      <Container>
        <Row className="mb-4">
          <Col md={3}>
            <h5 className="fw-bold mb-3">F8 - Học Lập Trình Để Đi Làm</h5>
            <p className="mb-1">Điện thoại: 08 1919 8989</p>
            <p className="mb-1">Email: contact@fullstack.edu.vn</p>
            <p className="mb-1">Địa chỉ: Số 1, ngõ 41, Trần Duy Hưng, Cầu Giấy, Hà Nội</p>
          </Col>

          <Col md={3}>
            <h6 className="fw-bold mb-3">VỀ F8</h6>
            <ul className="list-unstyled">
              <button className="btn btn-link text-light text-decoration-none p-0">Giới thiệu</button>
              <button className="btn btn-link text-light text-decoration-none p-0">Viec lam</button>  
              <button className="btn btn-link text-light text-decoration-none p-0">Học phí</button> 
              <button className="btn btn-link text-light text-decoration-none p-0">Học thử</button>    
            </ul>
          </Col>

          <Col md={3}>
            <h6 className="fw-bold mb-3">SẢN PHẨM</h6>
            <ul className="list-unstyled">
              <li>Game CSS Diner</li>
              <li>Game Froggy</li>
              <li>Game Scoops</li>
              <li>Game CSS Selectors</li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 className="fw-bold mb-3">CÔNG CỤ</h6>
            <ul className="list-unstyled">
              <li>Tạo CV xin việc</li>
              <li>Rút gọn liên kết</li>
              <li>Snippet Generator</li>
              <li>CSS Grid Generator</li>
            </ul>
          </Col>
        </Row>

        <hr className="border-secondary" />
        <div className="text-center text-muted small">
          © 2018 - 2025 F8. Nền tảng học lập trình hàng đầu Việt Nam.
        </div>
      </Container>
    </footer>
  );
}

export default FooterComponent;

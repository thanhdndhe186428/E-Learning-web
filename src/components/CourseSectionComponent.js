// src/components/CourseSectionComponent.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Spinner, Alert } from "react-bootstrap";
import { API } from "../utils/api"; // Giả sử bạn đã cấu hình API base URL trong utils/api.js

function CourseSectionComponent() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  API.get("/courses")
    .then((res) => setCourses(res.data))
    .catch((err) => {
      console.error("Lỗi API:", err);
      setError("Không thể tải dữ liệu khóa học.");
    })
    .finally(() => setLoading(false));
}, []);

  const proCourses = courses.filter((c) => c.type === "pro");
  const freeCourses = courses.filter((c) => c.type === "free");

  return (
    <Container className="mt-4">
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Đang tải dữ liệu...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">{error}</Alert>
      ) : (
        <>
          <h4 className="fw-bold mb-3">
            Khóa học Pro <Badge bg="primary">MỚI</Badge>
          </h4>
          <Row className="mb-5">
            {proCourses.length === 0 ? (
              <p className="text-muted">Không có khóa học Pro.</p>
            ) : (
              proCourses.map((course) => (
                <Col md={4} key={course.id}>
                  <Card className="mb-4 shadow-sm">
                    <Card.Body style={{ backgroundColor: "#2962ff", color: "white" }}>
                      <h5>{course.title}</h5>
                      <p>Cho người mới bắt đầu</p>
                    </Card.Body>
                    <Card.Body>
                      <p>
                        <del>{course.oldPrice?.toLocaleString()}đ</del>{" "}
                        <span className="text-danger fw-bold">{course.price?.toLocaleString()}đ</span>
                      </p>
                      <small className="text-muted">
                        {course.author} · {course.students} học viên · {course.duration}
                      </small>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>

          <h4 className="fw-bold mb-3">Khóa học miễn phí</h4>
          <Row className="mb-5">
            {freeCourses.length === 0 ? (
              <p className="text-muted">Không có khóa học miễn phí.</p>
            ) : (
              freeCourses.map((course) => (
                <Col md={3} key={course.id}>
                  <Card className="mb-4 shadow-sm bg-success text-white text-center">
                    <Card.Body>
                      <h6>{course.title}</h6>
                      <small>Học miễn phí · {course.students} người học</small>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </>
      )}
    </Container>
  );
}

export default CourseSectionComponent;

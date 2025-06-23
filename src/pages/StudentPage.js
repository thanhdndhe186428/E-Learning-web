import React from 'react';
import { Container } from 'react-bootstrap';

function StudentPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Container className="mt-5">
      <h2>Chào quản trị viên {user?.email}</h2>
      <p>Đây là trang dành riêng cho admin.</p>
    </Container>
  );
}

export default StudentPage;

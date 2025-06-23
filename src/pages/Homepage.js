// src/pages/Homepage.js
import React, { useEffect, useState } from "react";
import SidebarComponent from "../components/SidebarComponent";
import TopbarComponent from "../components/TopbarComponent";
import CourseSectionComponent from "../components/CourseSectionComponent";
import FooterComponent from "../components/FooterComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/homepage.css";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="homepage-wrapper d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <SidebarComponent />

        <div className="d-flex flex-column flex-grow-1">
          <TopbarComponent user={user} onLogout={() => setUser(null)} />

          <div className="flex-grow-1 px-4">
            <CourseSectionComponent />
          </div>
        </div>
      </div>

      <FooterComponent />
    </div>
  );
}

export default Homepage;

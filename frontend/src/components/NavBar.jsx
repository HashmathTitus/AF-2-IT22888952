import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./NavBar.css";
import globe from "../assets/globe.jpg"; // Adjust the path as necessary

const NavBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    if (storedUsername && storedToken) {
      setUser({ username: storedUsername });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  const confirmLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been successfully logged out.",
        });
      }
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="home-title">
            <div className="sff">
              <div className="globe-container">
                <img src={globe} alt="🌎" className="rotating-globe" />
                <span className="home-title">
                  Explore{" "}
                  <span
                    className="home-title-2"
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                  >
                    Countries
                  </span>
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>

          {user && (
            <Link to="/favorites" className="navbar-link">
              Favorites
            </Link>
          )}

          {user && (
            <div className="navbar-user">
              <span className="navbar-link">Hi, {user.username}</span>
              <span className="status-dot" />
            </div>
          )}

          {user ? (
            <button onClick={confirmLogout} className="navbar-btn logout-btn">
              Logout
            </button>
          ) : (
            <Link to="/login" className="navbar-btn login-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
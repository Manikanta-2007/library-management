import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    } else {
      setDarkMode(false);
      document.body.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="logo">Library Management</div>

      <div className="nav-right">
        <Link to="/">Home</Link>

        {!currentUser && <Link to="/signin">Sign In</Link>}

        {currentUser && (
          <Link to="/resources">Resources</Link>
        )}

        {currentUser?.role === "superadmin" && (
          <Link to="/superadmin">Super Admin</Link>
        )}

        {currentUser?.role === "admin" && currentUser?.approved && (
          <Link to="/admin">Admin</Link>
        )}

        {currentUser && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="theme-btn"
        >
          {darkMode ? "Dark" : "Light"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
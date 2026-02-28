import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "bollumanikanta61@gmail.com" && password === "mani@0203") {
      const superAdminUser = {
        name: "Super Admin",
        email: "bollumanikanta61@gmail.com",
        role: "superadmin"
      };
      localStorage.setItem("currentUser", JSON.stringify(superAdminUser));
      navigate("/superadmin");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid Credentials");
      return;
    }

    if (user.role === "admin" && !user.approved) {
      alert("Admin request pending approval");
      return;
    }

    if (user.role === "admin" && user.rejected) {
      alert("Admin request rejected by Super Admin");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user.role === "superadmin") {
      navigate("/superadmin");
    }
    else if (user.role === "admin") {
      navigate("/admin");
    }
    else {
      navigate("/");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-box">
        <h2>Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          className="input-field"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input-field"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="btn">
          Sign In
        </button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Don't have an account? <Link to="/register" style={{ color: "#3b5ccc", textDecoration: "none", fontWeight: "bold" }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const selectedRole = queryParams.get("role") || "student";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: selectedRole
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
      ...form,
      approved: form.role === "admin" ? false : true
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    navigate("/signin");
  };

  return (
    <div className="page-wrapper">
      <div className="form-box">
        <h2>Register</h2>

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="input-field"
          style={{ marginBottom: "15px", display: "block", width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <input
          name="name"
          placeholder="Name"
          className="input-field"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="input-field"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input-field"
          onChange={handleChange}
        />

        <button onClick={handleRegister} className="btn">
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
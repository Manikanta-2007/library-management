import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import SuperAdmin from "./pages/SuperAdmin";
import Admin from "./pages/Admin";
import Resources from "./pages/Resources";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/superadmin" element={<SuperAdmin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
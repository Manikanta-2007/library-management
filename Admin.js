import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function Admin() {
  const [pdf, setPdf] = useState(null);
  const [title, setTitle] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const isSuperAdmin = currentUser && currentUser.role === "superadmin";
  const isApprovedAdmin = currentUser && currentUser.role === "admin" && currentUser.approved;

  if (!isSuperAdmin && !isApprovedAdmin) {
    return <Navigate to="/signin" />;
  }

  const handleUpload = () => {
    if (!title) {
      alert("Please provide a title for the PDF");
      return;
    }
    if (!pdf) {
      alert("Select PDF first");
      return;
    }

    if (pdf.type !== "application/pdf") {
      alert("Only PDF allowed");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result;
      const newPdfConfig = {
        title,
        data: base64Data,
        timestamp: new Date().getTime(),
        uploadedBy: currentUser.email || "Unknown Admin",
      };

      const existingPending = JSON.parse(localStorage.getItem("pendingPdfs")) || [];
      existingPending.push(newPdfConfig);
      localStorage.setItem("pendingPdfs", JSON.stringify(existingPending));

      alert("PDF Submitted! Awaiting Super Admin Approval.");
      setPdf(null);
      setTitle("");
    };

    reader.readAsDataURL(pdf);
  };

  return (
    <div className="dashboard">
      <h2>Admin - Upload PDF</h2>

      <div className="card">
        <input
          type="text"
          placeholder="Enter PDF Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "15px", display: "block", width: "100%", padding: "8px" }}
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
          style={{ marginBottom: "15px", display: "block" }}
        />

        <button onClick={handleUpload} className="approve">
          Upload PDF
        </button>
      </div>
    </div>
  );
}

export default Admin;
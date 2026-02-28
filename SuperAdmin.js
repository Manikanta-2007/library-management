import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SuperAdmin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [pendingPdfs, setPendingPdfs] = useState([]);
  const [pdf, setPdf] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser || currentUser.email !== "bollumanikanta61@gmail.com") {
      navigate("/signin");
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(allUsers);

    const pending = JSON.parse(localStorage.getItem("pendingPdfs")) || [];
    setPendingPdfs(pending);
  }, [navigate]);

  const approveAdmin = (email) => {
    const updatedUsers = users.map((u) =>
      u.email === email ? { ...u, approved: true, rejected: false } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const rejectAdmin = (email) => {
    const updatedUsers = users.map((u) =>
      u.email === email ? { ...u, approved: false, rejected: true } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const approvePdf = (timestamp) => {
    const pdfToApprove = pendingPdfs.find((p) => p.timestamp === timestamp);
    if (!pdfToApprove) return;

    // Publish it
    const existingPdfs = JSON.parse(localStorage.getItem("uploadedPdfs")) || [];
    existingPdfs.push(pdfToApprove);
    localStorage.setItem("uploadedPdfs", JSON.stringify(existingPdfs));

    // Remove from pending
    const updatedPending = pendingPdfs.filter((p) => p.timestamp !== timestamp);
    localStorage.setItem("pendingPdfs", JSON.stringify(updatedPending));
    setPendingPdfs(updatedPending);

    alert("PDF Approved and Published.");
  };

  const rejectPdf = (timestamp) => {
    // Remove from pending without publishing
    const updatedPending = pendingPdfs.filter((p) => p.timestamp !== timestamp);
    localStorage.setItem("pendingPdfs", JSON.stringify(updatedPending));
    setPendingPdfs(updatedPending);

    alert("PDF request has been rejected and deleted.");
  };

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
        uploadedBy: "Super Admin", // Explicitly bypassing queue
      };

      const existingPdfs = JSON.parse(localStorage.getItem("uploadedPdfs")) || [];
      existingPdfs.push(newPdfConfig);
      localStorage.setItem("uploadedPdfs", JSON.stringify(existingPdfs));

      alert("PDF Uploaded Successfully");
      setPdf(null);
      setTitle("");
    };

    reader.readAsDataURL(pdf);
  };

  const admins = users.filter((u) => u.role === "admin");
  const students = users.filter((u) => u.role === "student");

  return (
    <div className="page-wrapper" style={{ height: "auto", minHeight: "90vh", padding: "20px" }}>
      <h2>Super Admin Panel</h2>

      <div className="card" style={{ marginBottom: "30px", width: "100%", maxWidth: "500px" }}>
        <h3>Directly Upload PDF Resource</h3>
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
          Upload PDF Instantly
        </button>
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>

        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3>Pending PDF Approvals</h3>
          {pendingPdfs.length === 0 ? (
            <p style={{ color: "gray", fontStyle: "italic" }}>No pending documents.</p>
          ) : (
            pendingPdfs.map((pending, index) => (
              <div key={index} className="admin-card card" style={{ padding: "15px" }}>
                <p><strong>Title:</strong> {pending.title}</p>
                <p><strong>Uploaded by:</strong> {pending.uploadedBy}</p>
                <p style={{ fontSize: "0.85em", color: "gray" }}>{new Date(pending.timestamp).toLocaleString()}</p>
                <div style={{ marginTop: "10px" }}>
                  <button onClick={() => approvePdf(pending.timestamp)} className="approve">
                    Approve & Publish
                  </button>
                  <button
                    onClick={() => rejectPdf(pending.timestamp)}
                    className="reject"
                    style={{ marginLeft: "10px" }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3>Admin Requests</h3>
          {admins.length === 0 ? (
            <p style={{ color: "gray", fontStyle: "italic" }}>No admin requests.</p>
          ) : (
            admins.map((admin, index) => (
              <div key={index} className="admin-card card" style={{ padding: "15px" }}>
                <p>Name: {admin.name}</p>
                <p>Email: {admin.email}</p>
                <p>
                  Status:{" "}
                  {admin.approved
                    ? "Approved"
                    : admin.rejected
                      ? "Rejected"
                      : "Pending"}
                </p>

                {!admin.approved && !admin.rejected && (
                  <div style={{ marginTop: "10px" }}>
                    <button onClick={() => approveAdmin(admin.email)} className="approve">
                      Approve
                    </button>
                    <button
                      onClick={() => rejectAdmin(admin.email)}
                      className="reject"
                      style={{ marginLeft: "10px" }}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>

      <h3 style={{ marginTop: "40px", textAlign: "center" }}>All Students</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
        {students.length === 0 ? (
          <p style={{ color: "gray", fontStyle: "italic" }}>No students registered.</p>
        ) : (
          students.map((student, index) => (
            <div key={index} className="admin-card card" style={{ width: "250px", padding: "15px" }}>
              <p>Name: {student.name}</p>
              <p>Email: {student.email}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default SuperAdmin;
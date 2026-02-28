import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Resources() {

  const navigate = useNavigate();
  const [pdfs, setPdfs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      alert("Please log in to view resources");
      navigate("/signin");
      return;
    }

    setCurrentUser(user);

    const storedPdfs = JSON.parse(localStorage.getItem("uploadedPdfs")) || [];
    setPdfs(storedPdfs);
  }, [navigate]);

  if (!currentUser) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="home-wrapper">
      <div className="home-content">
        <h1>Available Resources</h1>
        <div className="resource-section">

          {pdfs.length > 0 ? (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {pdfs.map((pdf, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                  <a href={pdf.data} target="_blank" rel="noopener noreferrer" className="btn" style={{ textDecoration: "none", display: "inline-block" }}>
                    View / Download: {pdf.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No resources have been uploaded yet.</p>
          )}

        </div>
      </div>
    </div>
  );
}

export default Resources;
import React from "react";

function Home() {
  return (
    <div className="home-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 60px)', textAlign: 'center' }}>
      <div className="home-content">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Welcome to Library Management</h1>
        <p style={{ fontSize: '1.2rem', color: '#555' }}>Access and manage resources easily.</p>

      </div>
    </div>
  );
}

export default Home;
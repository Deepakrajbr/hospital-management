import { useState } from "react";
import Navbar from "../components/Navbar";

function Admin() {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [message, setMessage] = useState("");

  const addDoctor = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          specialization
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add doctor");
      }

      setMessage("Doctor added successfully!");
      setName("");
      setSpecialization("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="app-page">
      <Navbar />

      <main className="dashboard">
        <div className="page-header">
          <span className="section-label">ADMINISTRATION</span>

          <h1>Hospital overview</h1>

          <p>
            Manage hospital operations and monitor important information.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👨‍⚕️</div>
            <strong>24</strong>
            <span>Doctors</span>
            <small>Active staff</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏥</div>
            <strong>06</strong>
            <span>Departments</span>
            <small>Medical departments</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <strong>148</strong>
            <span>Patients</span>
            <small>Registered patients</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <strong>32</strong>
            <span>Appointments</span>
            <small>Today's schedule</small>
          </div>
        </div>

        {/* ADD DOCTOR */}

        <div className="content-card admin-card">
          <span className="section-label">DOCTOR MANAGEMENT</span>

          <h2>Add Doctor</h2>

          <form onSubmit={addDoctor}>
            <div>
              <label>Doctor Name</label>

              <input
                type="text"
                placeholder="Enter doctor name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Specialization</label>

              <input
                type="text"
                placeholder="Enter specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
              />
            </div>

            <button type="submit">
              Add Doctor
            </button>
          </form>

          {message && <p>{message}</p>}
        </div>

        {/* SYSTEM STATUS */}

        <div className="content-card admin-card">
          <span className="section-label">SYSTEM STATUS</span>

          <h2>Hospital services</h2>

          <div className="service-row">
            <span>Auth Service</span>
            <strong>● Online</strong>
          </div>

          <div className="service-row">
            <span>Doctor Service</span>
            <strong>● Online</strong>
          </div>

          <div className="service-row">
            <span>API Gateway</span>
            <strong>● Online</strong>
          </div>

          <div className="service-row">
            <span>Database</span>
            <strong>● Online</strong>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admin;
import Navbar from "../components/Navbar";

function Admin() {
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
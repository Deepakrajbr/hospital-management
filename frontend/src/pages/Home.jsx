import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="app-page">
      <Navbar />

      <main className="dashboard">
        <section className="welcome-card">
          <div>
            <span className="section-label">HEALTH OVERVIEW</span>

            <h1>
              Welcome to
              <br />
              <em>CareFlow.</em>
            </h1>

            <p>
              Manage your healthcare, appointments and doctors
              from one convenient dashboard.
            </p>

            <Link to="/doctors" className="primary-button">
              Find a doctor →
            </Link>
          </div>

          <div className="medical-symbol">✚</div>
        </section>

        <div className="dashboard-heading">
          <div>
            <span className="section-label">OVERVIEW</span>
            <h2>Today's snapshot</h2>
          </div>
        </div>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">◷</div>
            <strong>03</strong>
            <span>Appointments</span>
            <small>1 upcoming</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon">♙</div>
            <strong>12</strong>
            <span>Doctors</span>
            <small>6 specialties</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <strong>98%</strong>
            <span>Records</span>
            <small>Up to date</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon">♡</div>
            <strong>Good</strong>
            <span>Health status</span>
            <small>Keep it up!</small>
          </div>
        </section>

        <section className="home-grid">
          <div className="content-card">
            <span className="section-label">UPCOMING</span>

            <h2>Next appointment</h2>

            <div className="appointment">
              <div className="doctor-avatar">SW</div>

              <div>
                <strong>Dr. Sarah Wilson</strong>
                <p>Cardiology</p>
                <span>Today · 10:30 AM</span>
              </div>
            </div>

            <button className="secondary-button">
              View appointment
            </button>
          </div>

          <div className="content-card">
            <span className="section-label">QUICK ACTIONS</span>

            <h2>What do you need?</h2>

            <div className="quick-actions">
              <Link to="/doctors">👨‍⚕️ Find a doctor →</Link>
              <Link to="/doctors">📅 Book appointment →</Link>
              <Link to="/admin">🏥 Hospital information →</Link>
              <Link to="/home">📋 Health overview →</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
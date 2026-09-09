import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/doctors")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        return response.json();
      })
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load doctors.");
        setLoading(false);
      });
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-page">
      <Navbar />

      <main className="dashboard">
        <div className="page-header">
          <span className="section-label">MEDICAL TEAM</span>

          <h1>Find your doctor</h1>

          <p>
            Browse our medical specialists and find the right doctor
            for your healthcare needs.
          </p>
        </div>

        <div className="doctor-toolbar">
          <input
            type="text"
            placeholder="Search doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading && (
          <div className="content-card">
            <h2>Loading doctors...</h2>
          </div>
        )}

        {error && (
          <div className="error-card">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="doctors-grid">
            {filteredDoctors.map((doctor) => (
              <div className="doctor-card" key={doctor.id}>
                <div className="doctor-avatar large">
                  {doctor.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <h2>{doctor.name}</h2>

                <p className="specialization">
                  {doctor.specialization}
                </p>

                <p className="doctor-status">
                  ● Available
                </p>

                <button className="secondary-button">
                  View profile
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Doctors;
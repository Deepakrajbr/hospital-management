import { useEffect, useState } from "react";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Doctors</h1>

      {doctors.map((doctor) => (
        <div key={doctor.id}>
          <h3>{doctor.name}</h3>
          <p>{doctor.specialization}</p>
        </div>
      ))}
    </div>
  );
}

export default Doctors;
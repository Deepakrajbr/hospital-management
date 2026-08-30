import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home</h1>

      <p>Welcome to Hospital Management System</p>

      <Link to="/doctors">
        View Doctors
      </Link>

      <br />

      <Link to="/admin">
        Admin
      </Link>
    </div>
  );
}

export default Home;
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="brand-icon">✚</div>
        <div>
          <strong>CareFlow</strong>
          <span>Hospital Management</span>
        </div>
      </div>

      <div className="nav-links">
        <NavLink to="/home">Dashboard</NavLink>
        <NavLink to="/doctors">Doctors</NavLink>
        <NavLink to="/admin">Admin</NavLink>
        
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
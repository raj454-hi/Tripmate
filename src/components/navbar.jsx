
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className={`navbar ${isHome ? "navbar-home" : "navbar-inner"}`}>
      <div className="logo">
        <span>TripMate</span>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/create-trip">Create Trip</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="/split-money">Split Money</Link>
      </div>
    </nav>
  );
}

export default Navbar;

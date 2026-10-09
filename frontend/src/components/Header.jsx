import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <header className="learn-navbar">
      <Link to="/" className="learn-logo">
        Algo<span>Viz</span>
      </Link>

      <nav>
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/learn"
          className={
            location.pathname.startsWith("/learn") ? "active" : ""
          }
        >
          Learn
        </Link>

        <Link
          to="/visualizer"
          className={
            location.pathname === "/visualizer" ? "active" : ""
          }
        >
          Visualizer
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
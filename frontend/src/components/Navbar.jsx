import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearSession, getUserName, isLoggedIn } from "../utils/auth";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const loggedIn = isLoggedIn();
  const userName = getUserName();

  const handleLogout = () => {
    clearSession();
    navigate("/", { replace: true });
  };

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
          className={location.pathname.startsWith("/learn") ? "active" : ""}
        >
          Learn
        </Link>

        <Link
          to="/visualizer"
          className={location.pathname === "/visualizer" ? "active" : ""}
        >
          Visualizer
        </Link>

        <Link
          to="/quiz"
          className={location.pathname.startsWith("/quiz") ? "active" : ""}
        >
          Quiz
        </Link>

        <Link
          to="/progress"
          className={location.pathname === "/progress" ? "active" : ""}
        >
          Progress
        </Link>

        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          Dashboard
        </Link>
      </nav>

      <div className="learn-nav-auth">
        {loggedIn ? (
          <>
            {userName && (
              <span className="learn-nav-user">{userName}</span>
            )}

            <button
              type="button"
              className="learn-nav-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="learn-nav-login">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;

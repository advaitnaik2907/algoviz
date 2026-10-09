import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn, saveSession } from "../utils/auth";
import { API_BASE_URL } from "../config";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // Page the user originally wanted (set by ProtectedRoute)
  const redirectTo = location.state?.from || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Invalid email or password");
      }

      const data = await response.json();

      // Save authentication information
      saveSession(data);

      // Go to the page the user wanted (or the dashboard)
      navigate(redirectTo, { replace: true });

    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  // Already logged in? No need to see the login form.
  if (isLoggedIn()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Login to continue learning algorithms</p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="auth-field">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/signup">Create an account</Link>
          </p>
        </div>

      </div>

    </div>
  );
}

export default Login;
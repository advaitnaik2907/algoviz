import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

// Wrap any page that needs a logged-in user:
//   <ProtectedRoute> <Dashboard /> </ProtectedRoute>
//
// If the user is not logged in, they are sent to /login.
// We remember the page they wanted, so after login they
// are taken straight back to it.
function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!isLoggedIn()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}

export default ProtectedRoute;

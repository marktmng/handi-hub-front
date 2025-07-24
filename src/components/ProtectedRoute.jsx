import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const role = localStorage.getItem("role");

  if (!role) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Role not authorized
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;

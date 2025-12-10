import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const CurrentToken = localStorage.getItem("token");
  
  if (!CurrentToken) {
    // Redirect to login if token doesn't exist
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;

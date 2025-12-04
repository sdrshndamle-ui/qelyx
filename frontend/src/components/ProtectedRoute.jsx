import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Session expires after 24 hours
const SESSION_DURATION = 24 * 60 * 60 * 1000;

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('qelyx_authenticated') === 'true';
  const authTimestamp = localStorage.getItem('qelyx_auth_timestamp');
  
  // Check if session has expired
  const isSessionValid = () => {
    if (!authTimestamp) return false;
    const elapsed = Date.now() - parseInt(authTimestamp, 10);
    return elapsed < SESSION_DURATION;
  };

  if (!isAuthenticated || !isSessionValid()) {
    // Clear expired session
    localStorage.removeItem('qelyx_authenticated');
    localStorage.removeItem('qelyx_auth_timestamp');
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;


import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectIsAuthenticated } from '@/redux/slices/authSlice';

const PrivateRoute = ({ children, to = '/' }) => {
  const isAuthorized = useSelector(selectIsAuthenticated);

  if (!isAuthorized) return <Navigate to={to} replace />;

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.any,
  to: PropTypes.string,
};

export default PrivateRoute;

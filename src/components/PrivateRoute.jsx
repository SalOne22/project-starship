import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectToken } from '@/redux/slices/authSlice';

const PrivateRoute = ({ children, to = '/' }) => {
  const token = useSelector(selectToken);

  if (!token) return <Navigate to={to} replace />;

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.any,
  to: PropTypes.string,
};

export default PrivateRoute;

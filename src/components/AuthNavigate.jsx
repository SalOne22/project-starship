import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
function AuthNavigate({ route, text }) {
  const linkStyle = {
    textAlign: 'center',
    marginTop: '40px',
    marginBottom: '40px',
    color: '#0077cc',
  };
  return (
    <>
      <Link to={route} style={linkStyle}>
        {text}
      </Link>
      {/* <a href="https://gt-project.onrender.com/api/auth/google" type="button">
        google
      </a> */}
    </>
  );
}

AuthNavigate.propTypes = {
  route: PropTypes.string,
  text: PropTypes.string,
};
export default AuthNavigate;

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import theme from '@/theme';
import { Center } from '@mantine/core';

function AuthNavigate({ route, text }) {
  const linkStyle = {
    color: theme.colors.blue[4],
    marginTop: '18px',
  };
  return (
    <Center>
      <Link to={route} style={linkStyle}>
        {text}
      </Link>
      {/* <a href="https://gt-project.onrender.com/api/auth/google" type="button">
        google
      </a>  */}
    </Center>
  );
}

AuthNavigate.propTypes = {
  route: PropTypes.string,
  text: PropTypes.string,
};
export default AuthNavigate;

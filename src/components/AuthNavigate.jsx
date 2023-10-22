import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Center } from '@mantine/core';
import css from './styles/AuthNavigate.module.css';

function AuthNavigate({ route, text }) {
  return (
    <Center>
      <Link to={route} className={css.link}>
        {text}
      </Link>
    </Center>
  );
}

AuthNavigate.propTypes = {
  route: PropTypes.string,
  text: PropTypes.string,
};
export default AuthNavigate;

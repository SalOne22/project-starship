import PropTypes from 'prop-types';
import Register from '@/modules/Register/components/RegisterForm';
import AuthNavigate from '@/components/AuthNavigate';
import { Box, Center, Container } from '@mantine/core';
import css from './styles/RegisterPage.module.css';
import Rocket from '@/assets/images/404/rocket.svg?react';

function RegisterPage() {
  return (
    <Center className={css.pageStyle}>
      <Container className={css.containerStyle}>
        <Box className={css.box}>
          <Rocket className={css.rocket} />
          <Register />
          <AuthNavigate route="/login" text="Log In" />
        </Box>
      </Container>
    </Center>
  );
}
RegisterPage.propTypes = {
  route: PropTypes.string,
  text: PropTypes.string,
};
export default RegisterPage;

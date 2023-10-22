import PropTypes from 'prop-types';
import Register from '@/modules/Register/components/RegisterForm';
import AuthNavigate from '@/components/AuthNavigate';
import { Box, Center, Container } from '@mantine/core';
import css from './styles/RegisterPage.module.css';
import Goose from '@/assets/images/register/goose.svg?react';

function RegisterPage() {
  return (
    <Center className={css.pageStyle}>
      <Container className={css.containerStyle}>
        <Box className={css.images}>
          <Goose className={css.goose} />
        </Box>
        <Box className={css.wrapper}>
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

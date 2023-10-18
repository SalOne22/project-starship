import PropTypes from 'prop-types';
import Register from '@/modules/Register/components/RegisterForm';
import AuthNavigate from '@/components/AuthNavigate';
import { Center, Container } from '@mantine/core';
// import css from './styles/RegisterPage.module.css'

function RegisterPage() {
  const containerStyle = {
    // border: '1px solid red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };
  const pageStyle = {
    background: '#DCEBF7',
    minHeight: '100vh',
    paddingTop: '155px',
    paddingBottom: '155px',
  };

  return (
    <Center
      // className={css.pageStyle}
      // c="blue.4"
      style={pageStyle}
    >
      <Container
        // className={css.containerStyle}
        style={containerStyle}
      >
        <Register />
        <AuthNavigate route="/login" text="Log In" />
      </Container>
    </Center>
  );
}
RegisterPage.propTypes = {
  route: PropTypes.string,
  text: PropTypes.string,
};
export default RegisterPage;

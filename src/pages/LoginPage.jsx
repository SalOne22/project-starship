import PropTypes from 'prop-types';
import Login from '@/modules/Login';
import AuthNavigate from '@/components/AuthNavigate';
import { Container } from '@mantine/core';

function LoginPage() {
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
    // <div>
    //   <Login />
    //   <AuthNavigate route="/register" text="Sign Up" />
    // </div>
    //  <Center>
    <div style={pageStyle}>
      <Container style={containerStyle}>
        <Login />
        <AuthNavigate route="/register" text="Sign Up" />
      </Container>
    </div>
    // </Center>
  );
}
LoginPage.propTypes = {
  route: PropTypes.string,
  text: PropTypes.string,
};
export default LoginPage;

import PropTypes from 'prop-types';
import Register from '@/modules/Register/components/RegisterForm';
import AuthNavigate from '@/components/AuthNavigate';
import { Container } from '@mantine/core';

function RegisterPage() {
  const containerStyle = {
    // border: '1px solid red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    // width: '100%'
  };
  const pageStyle = {
    background: '#DCEBF7',
    minHeight: '100vh',
    paddingTop: '155px',
    paddingBottom: '155px',

    // display: 'flex',   //три св-ва вместо Center
    // justifyContent: 'center',
    // alignItems: 'center',
  };

  return (
    // <div>
    //   <Register />
    //   <AuthNavigate route="/login" text="Log In" />
    // </div>
    <div
      //  <Center
      style={pageStyle}
    >
      <Container style={containerStyle}>
        <Register />
        <AuthNavigate route="/login" text="Log In" />
      </Container>
    </div>
    //  </Center>
  );
}
RegisterPage.propTypes = {
  route: PropTypes.string,
  text: PropTypes.string,
};
export default RegisterPage;

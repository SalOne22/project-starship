import PropTypes from 'prop-types';
import Login from '@/modules/Login';
import AuthNavigate from '@/components/AuthNavigate';

function LoginPage() {
  return (
    <div>
      <Login />
      <AuthNavigate route="/register" text="Sign Up" />
    </div>
  );
}
LoginPage.propTypes = {
  route: PropTypes.string,
  text: PropTypes.string,
};
export default LoginPage;

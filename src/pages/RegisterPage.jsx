import PropTypes from 'prop-types';
import Register from '@/modules/Register/components/RegisterForm';
import AuthNavigate from '@/components/AuthNavigate';

function RegisterPage() {
  return (
    <div>
      <Register />
      <AuthNavigate route="/login" text="Log In" />
    </div>
  );
}
RegisterPage.propTypes = {
  route: PropTypes.string,
  text: PropTypes.string,
};
export default RegisterPage;

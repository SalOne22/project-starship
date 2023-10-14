import PropTypes from 'prop-types';
import Register from '@/modules/Register';
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
  route: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
export default RegisterPage;

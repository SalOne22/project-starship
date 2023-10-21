import { UserInputForm } from './InputForm.jsx';
import css from './InputForm.module.css';

function UserForm() {
  console.log('UserForm is working');
  return (
    <div className={css.userWrapper}>
      <UserInputForm />
    </div>
  );
}

export default UserForm;

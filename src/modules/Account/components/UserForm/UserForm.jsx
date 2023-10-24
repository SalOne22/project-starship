import { UserInputForm } from './InputForm.jsx';
import css from './InputForm.module.css';

function UserForm() {
  return (
    <div className={css.userWrapper}>
      <UserInputForm />
    </div>
  );
}

export default UserForm;

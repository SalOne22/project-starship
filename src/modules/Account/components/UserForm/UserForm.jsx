import { UserInputForm } from './InputForm.jsx';
import classes from './InputForm.module.css';

function UserForm() {
  console.log('UserForm is working');
  return (
    <div className={classes.userWrapper}>
      <UserInputForm />
    </div>
  );
}

export default UserForm;

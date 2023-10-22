import ChangePassButton from './components/ChangePassButton/ChangePassButton.jsx';
import DeleteUserBtn from './components/DeleteUserBtn.jsx';
import UserForm from './components/UserForm/UserForm.jsx';
function Account() {
  return (
    <div>
      <UserForm />
      <ChangePassButton />
      <DeleteUserBtn />
    </div>
  );
}

export default Account;

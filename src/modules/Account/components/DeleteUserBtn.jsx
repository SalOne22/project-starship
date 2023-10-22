import { useState } from 'react';
import css from '../styles/DeleteUserBtn.module.css';

import DeleteUserModal from './DeleteUserModal';

function DeleteUserBtn() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button type="button" className={css.deleteUserBtn} onClick={openModal}>
        Delete my account
      </button>
      {isOpen && <DeleteUserModal onClose={closeModal} />}
    </>
  );
}

export default DeleteUserBtn;

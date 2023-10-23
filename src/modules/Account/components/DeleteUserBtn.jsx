import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import css from '../styles/DeleteUserBtn.module.css';

import DeleteUserModal from './DeleteUserModal';

function DeleteUserBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button type="button" className={css.deleteUserBtn} onClick={openModal}>
        {t('userDeleteForm.buttons.delete')}
      </button>
      {isOpen && <DeleteUserModal onClose={closeModal} />}
    </>
  );
}

export default DeleteUserBtn;

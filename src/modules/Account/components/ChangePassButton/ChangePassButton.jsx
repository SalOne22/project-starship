import { Button } from '@mantine/core';
import { useState } from 'react';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';
import Modal from '@/components/Modal';

function ChangePassButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={handleEdit}>Change password</Button>
      {isOpen && (
        <Modal onClose={onClose}>
          <ChangePasswordForm onClose={onClose} />
        </Modal>
      )}
    </>
  );
}

export default ChangePassButton;

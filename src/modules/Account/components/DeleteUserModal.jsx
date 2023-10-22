import Modal from '@/components/Modal';
import DeleteUserForm from './DeleteUserForm';
import propTypes from 'prop-types';

function DeleteUserModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <DeleteUserForm onClose={onClose} />
    </Modal>
  );
}

DeleteUserModal.propTypes = {
  onClose: propTypes.func,
};

export default DeleteUserModal;

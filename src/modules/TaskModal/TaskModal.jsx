import Modal from '@/components/Modal';
import TaskForm from './components/TaskForm';
import PropTypes from 'prop-types';

function TaskModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <TaskForm />
    </Modal>
  );
}

TaskModal.propTypes = {
  onClose: PropTypes.func,
};
export default TaskModal;

import Modal from '@/components/Modal';
import TaskForm from './components/TaskForm';
import PropTypes from 'prop-types';

function TaskModal({ onClose, category }) {
  return (
    <Modal onClose={onClose}>
      <TaskForm onClose={onClose} category={category} />
    </Modal>
  );
}

TaskModal.propTypes = {
  onClose: PropTypes.func,
  category: PropTypes.string,
};
export default TaskModal;

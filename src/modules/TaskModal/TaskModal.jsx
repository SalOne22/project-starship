import Modal from '@/components/Modal';
import TaskForm from './components/TaskForm';
import PropTypes from 'prop-types';

function TaskModal({ onClose, category, task }) {
  return (
    <Modal onClose={onClose}>
      <TaskForm onClose={onClose} category={category} task={task} />
    </Modal>
  );
}

TaskModal.propTypes = {
  onClose: PropTypes.func,
  category: PropTypes.string,
  task: PropTypes.object,
};
export default TaskModal;

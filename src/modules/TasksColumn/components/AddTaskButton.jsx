import css from '../styles/AddTaskButton.module.css';
import { IconPlus } from '@tabler/icons-react';

// eslint-disable-next-line react/prop-types
function AddTaskButton({ children, onClick }) {
  return (
    <button className={css.addButton} onClick={onClick}>
      <IconPlus style={{ marginRight: '8px' }} />
      {children}
    </button>
  );
}

export default AddTaskButton;

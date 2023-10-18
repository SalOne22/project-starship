import { Box, Button, Loader, Menu } from '@mantine/core';
import {
  IconCircleArrowRight,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';
import css from '../styles/TaskToolbar.module.css';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask } from '@/modules/Calendar/redux/operations';
import TaskModal from '@/modules/TaskModal/TaskModal';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { notifications } from '@mantine/notifications';
import theme from '@/theme';

function TaskToolbar({ task }) {
  const [isOpen, setModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatch = useDispatch();

  console.log(isDeleting);
  // const isLoading = useSelector((state) => state.tasks.isLoading);

  const categories = ['to-do', 'in progress', 'done']

    .filter((category) => category !== task.category)
    .map((category) => {
      return category.charAt(0).toUpperCase() + category.slice(1);
    });

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteTask(task._id));
      setIsDeleting(false);
      handleMessage('Task is successfully delated', theme.colors.green[6]);
    } catch {
      handleMessage(
        'Something went wrong, please try again later',
        theme.colors.red[6],
      );
    }
  };

  const handleChangePriority = async (newCategory) => {
    try {
      const newCategoryEdited =
        newCategory.charAt(0).toLowerCase() + newCategory.slice(1);
      await dispatch(editTask({ ...task, category: newCategoryEdited }));
    } catch {
      handleMessage(
        'Something went wrong, please try again later',
        theme.colors.red[6],
      );
    }
  };

  const handleEdit = () => {
    setModal(true);
  };

  const onClose = () => {
    setModal(false);
  };

  const handleMessage = (message, color) => {
    notifications.show({
      message: message,
      autoClose: 3000,
      color: color,
    });
  };

  return (
    <Box className={css.taskToolbarWrapper}>
      <Menu>
        <Menu.Target>
          <Button
            variant="transparent"
            p={0}
            styles={{
              label: { alignItems: 'end' },
            }}
          >
            <IconCircleArrowRight size={20} className={css.icon} />
          </Button>
        </Menu.Target>

        <Menu.Dropdown className={css.dropdown}>
          <ul className={css.categoryList}>
            <li
              className={css.categoryItem}
              onClick={() => handleChangePriority(categories[0])}
            >
              {categories[0]}
              <IconCircleArrowRight size={20} className={css.icon} />
            </li>
            <li
              className={css.categoryItem}
              onClick={() => handleChangePriority(categories[1])}
            >
              {categories[1]}
              <IconCircleArrowRight size={20} className={css.icon} />
            </li>
          </ul>
        </Menu.Dropdown>
      </Menu>

      <Button
        variant="transparent"
        p={0}
        styles={{
          label: { alignItems: 'end' },
        }}
        onClick={handleEdit}
      >
        <IconPencil size={20} className={css.icon} />
      </Button>
      <Button
        variant="transparent"
        p={0}
        styles={{
          label: { alignItems: 'end' },
        }}
        onClick={handleDelete}
      >
        {isDeleting ? (
          <Loader size={20} />
        ) : (
          <IconTrash size={20} className={css.icon} />
        )}
      </Button>
      {isOpen && (
        <TaskModal onClose={onClose} task={task} category={task.category} />
      )}
    </Box>
  );
}

TaskToolbar.propTypes = {
  task: PropTypes.object,
};

export default TaskToolbar;

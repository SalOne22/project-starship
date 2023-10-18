import { Box, Button, Loader, Menu } from '@mantine/core';
import {
  IconCircleArrowRight,
  IconCircleArrowLeft,
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
import { useTranslation } from 'react-i18next';

function TaskToolbar({ task }) {
  const [isOpen, setModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const categories = ['to-do', 'in progress', 'done'];

  const getIconForCategory = (category) => {
    switch (category) {
      case 'to-do':
        return <IconCircleArrowLeft size={20} className={css.icon} />;
      case 'in progress':
        return task.category === 'done' ? (
          <IconCircleArrowLeft size={20} className={css.icon} />
        ) : (
          <IconCircleArrowRight size={20} className={css.icon} />
        );
      case 'done':
        return <IconCircleArrowRight size={20} className={css.icon} />;
      default:
        return null;
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteTask(task._id));
      setIsDeleting(false);
      handleMessage(
        t('calendar.chosenday.notification.removeSuccess'),
        theme.colors.green[6],
      );
    } catch {
      handleMessage(
        t('calendar.chosenday.notification.error'),
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
        t('calendar.chosenday.notification.error'),
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
            {categories
              .filter((category) => category !== task.category)
              .map((category) => (
                <li
                  key={category}
                  className={css.categoryItem}
                  onClick={() => handleChangePriority(category)}
                >
                  {t(`calendar.chosenday.card.category.${category}`)}
                  {getIconForCategory(category)}
                </li>
              ))}
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
        disabled={isDeleting}
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

import { Box, Button, Menu } from '@mantine/core';
import {
  IconCircleArrowRight,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';
import css from '../styles/TaskToolbar.module.css';
// import { useDispatch } from 'react-redux';
// import { deleteTask } from '@/modules/Calendar/redux/operations';
import TaskModal from '@/modules/TaskModal/TaskModal';
import { useState } from 'react';

function TaskToolbar() {
  const [isOpen, setModal] = useState(false);

  const task = 'to-do';

  const categories = ['to-do', 'in progress', 'done']
    .filter((category) => category !== task)
    .map((category) => {
      return category.charAt(0).toUpperCase() + category.slice(1);
    });

  // const dispatch = useDispatch();

  // const handleDelete = () => {
  //  dispatch(deleteTask(task.id));
  // }

  const handleEdit = () => {
    setModal(true);
  };

  const onClose = () => {
    setModal(false);
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
            <IconCircleArrowRight size={18} className={css.icon} />
          </Button>
        </Menu.Target>

        <Menu.Dropdown className={css.dropdown} left={210}>
          <ul className={css.categoryList}>
            <li className={css.categoryItem}>
              {categories[0]}
              <IconCircleArrowRight size={20} className={css.icon} />
            </li>
            <li className={css.categoryItem}>
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
        <IconPencil size={18} className={css.icon} />
      </Button>
      <Button
        variant="transparent"
        p={0}
        styles={{
          label: { alignItems: 'end' },
        }}
        // onClick={handleDelete}
      >
        <IconTrash size={18} className={css.icon} />
      </Button>
      {isOpen && <TaskModal onClose={onClose} />}
    </Box>
  );
}

export default TaskToolbar;

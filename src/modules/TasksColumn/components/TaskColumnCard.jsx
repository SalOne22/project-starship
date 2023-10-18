import { Box, Text } from '@mantine/core';
import css from '../styles/TaskColumnCard.module.css';
import TaskToolbar from './TaskToolbar';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectUserData } from '@/redux/slices/authSlice';
import theme from '@/theme';
import { useTranslation } from 'react-i18next';

function TaskColumnCard({ task }) {
  const priorityColor = getPriorityColor(task.priority);
  const { t } = useTranslation();

  const { username, avatarURL } = useSelector(selectUserData) ?? {};

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: {
      task,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  function getPriorityColor(priority) {
    const priorityColors = {
      high: theme.colors.red[10],
      medium: theme.colors.orange[10],
      low: theme.colors.blue[10],
    };

    return priorityColors[priority] || theme.colors.blue[0];
  }

  return (
    <li
      ref={drag}
      className={clsx(css.cardBox, isDragging ? css.draggedTask : null)}
    >
      <Text className={css.task}>{task.title}</Text>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
        }}
      >
        <Box
          style={{
            display: 'flex',
            alignItems: 'end',
            gap: '8px',
          }}
        >
          <Box className={css.avatar}>
            {avatarURL ? (
              <img className={css.avatarImg} src={avatarURL} alt={username} />
            ) : (
              <span> {username && username[0].toUpperCase()}</span>
            )}
          </Box>
          <Box
            className={css.priority}
            style={{ backgroundColor: priorityColor }}
          >
            <p className={css.priorityText}>
              {t(`calendar.chosenday.card.priority.${task.priority}`)}
            </p>
          </Box>
        </Box>
        <TaskToolbar task={task} />
      </Box>
    </li>
  );
}

TaskColumnCard.propTypes = {
  task: PropTypes.shape({
    priority: PropTypes.oneOf(['high', 'medium', 'low']),
    title: PropTypes.string,
  }),
};

export default TaskColumnCard;

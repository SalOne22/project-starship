import { Box, Text } from '@mantine/core';
import css from '../styles/TaskColumnCard.module.css';
import TaskToolbar from './TaskToolbar';
import PropTypes from 'prop-types';

function TaskColumnCard({ task }) {
  const priorityColor = getPriorityColor(task.priority);

  function getPriorityColor(priority) {
    const priorityColors = {
      high: '#EA3D65',
      medium: '#F3B249',
      low: '#72C2F8',
    };

    return priorityColors[priority] || '#999';
  }

  const taskPriority =
    task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

  return (
    <li className={css.cardBox}>
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
            <span>A</span>
          </Box>
          <Box
            className={css.priority}
            style={{ backgroundColor: priorityColor }}
          >
            <p className={css.priorityText}>{taskPriority}</p>
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

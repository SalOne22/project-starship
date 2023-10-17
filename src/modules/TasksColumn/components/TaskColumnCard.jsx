import { Box, Text } from '@mantine/core';
import css from '../styles/TaskColumnCard.module.css';
import TaskToolbar from './TaskToolbar';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import clsx from 'clsx';

function TaskColumnCard({ task }) {
  const priorityColor = getPriorityColor(task.priority);

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
      high: '#EA3D65',
      medium: '#F3B249',
      low: '#72C2F8',
    };

    return priorityColors[priority] || '#999';
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
            <span>A</span>
          </Box>
          <Box
            className={css.priority}
            style={{ backgroundColor: priorityColor }}
          >
            <p className={css.priorityText}>{task.priority}</p>
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

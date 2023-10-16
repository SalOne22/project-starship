import { Box, Text } from '@mantine/core';
import css from '../styles/TaskColumnCard.module.css';
import TaskToolbar from './TaskToolbar';
import PropTypes from 'prop-types';

function TaskColumnCard() {
  const priorityColor = getPriorityColor('high');

  function getPriorityColor(priority) {
    const priorityColors = {
      high: '#EA3D65',
      medium: '#F3B249',
      low: '#72C2F8',
    };

    return priorityColors[priority] || '#999';
  }
  return (
    <Box className={css.cardBox}>
      <Text className={css.task}>title</Text>
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
          ></Box>
        </Box>
        <TaskToolbar />
      </Box>
    </Box>
  );
}

TaskColumnCard.propTypes = {
  task: PropTypes.shape({
    priority: PropTypes.oneOf(['high', 'medium', 'low']),
    title: PropTypes.string,
  }),
};

export default TaskColumnCard;

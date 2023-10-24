import TaskColumnCard from './TaskColumnCard';
import css from '../styles/ColumnsTasksList.module.css';
import PropTypes from 'prop-types';

function ColumnsTasksList({ tasksToMap, isValidDate }) {
  return (
    <>
      {tasksToMap.length > 0 && (
        <ul className={css.columnsTasksList}>
          {tasksToMap.map((task) => (
            <TaskColumnCard
              key={task._id}
              task={task}
              isValidDate={isValidDate}
            />
          ))}
        </ul>
      )}
    </>
  );
}

ColumnsTasksList.propTypes = {
  tasksToMap: PropTypes.arrayOf(PropTypes.object),
  isValidDate: PropTypes.bool,
};

export default ColumnsTasksList;

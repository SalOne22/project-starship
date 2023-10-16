import { useEffect, useState } from 'react';
import AddTaskButton from './components/AddTaskButton';
import ColumnHeadBar from './components/ColumnHeadBar';
import css from './styles/TaskColumn.module.css';
import { ScrollArea } from '@mantine/core';
import TaskColumnCard from './components/TaskColumnCard';
import PropTypes from 'prop-types';
import TaskModal from '../TaskModal';

function TasksColumn({ category, tasks }) {
  const [tasksToMap, setTasksToMap] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (category === 'to-do') {
      const tasksToDone = tasks.filter((task) => task.category === 'to-do');
      setTasksToMap(tasksToDone);
      return;
    } else if (category === 'in progress') {
      const tasksInProgress = tasks.filter(
        (task) => task.category === 'in progress',
      );
      setTasksToMap(tasksInProgress);
      return;
    } else if (category === 'done') {
      const tasksDone = tasks.filter((task) => task.category === 'done');
      setTasksToMap(tasksDone);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  return (
    <div className={css.tasksColumn}>
      <ColumnHeadBar title={category} onClick={onOpen} />
      <ScrollArea.Autosize mah={368} offsetScrollbars scrollHideDelay={250}>
        {tasksToMap.length > 0 &&
          tasksToMap.map((task) => (
            <TaskColumnCard key={task._id} task={task} />
          ))}
      </ScrollArea.Autosize>

      <AddTaskButton onClick={onOpen}>Add task</AddTaskButton>
      {isOpen && <TaskModal category={category} onClose={onClose} />}
    </div>
  );
}

TasksColumn.propTypes = {
  category: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object),
};

export default TasksColumn;

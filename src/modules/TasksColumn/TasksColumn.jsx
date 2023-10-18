import { useEffect, useState } from 'react';
import AddTaskButton from './components/AddTaskButton';
import ColumnHeadBar from './components/ColumnHeadBar';
import css from './styles/TaskColumn.module.css';
import PropTypes from 'prop-types';
import TaskModal from '../TaskModal';
import { useDrop } from 'react-dnd';
import { editTask } from '../Calendar/redux/operations';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import ColumnsTasksList from './components/ColumnsTasksList';

function TasksColumn({ category, tasks, title }) {
  const [tasksToMap, setTasksToMap] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const addItemToSection = (task) => {
    const newTask = {
      _id: task._id,
      title: task.title,
      start: task.start,
      end: task.end,
      priority: task.priority,
      date: task.date,
      category,
    };

    dispatch(editTask(newTask));
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => addItemToSection(item.task),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

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
    <div
      ref={drop}
      className={clsx(css.tasksColumn, isOver ? css.boxDrop : null)}
    >
      <ColumnHeadBar title={title} onClick={onOpen} />
      <ColumnsTasksList tasksToMap={tasksToMap} />
      <AddTaskButton onClick={onOpen}>Add task</AddTaskButton>
      {isOpen && <TaskModal category={category} onClose={onClose} />}
    </div>
  );
}

TasksColumn.propTypes = {
  category: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default TasksColumn;

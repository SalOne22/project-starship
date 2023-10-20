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
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function TasksColumn({ category, tasks, title }) {
  const [tasksToMap, setTasksToMap] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isValidDate, setIsValidDate] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { currentDay } = useParams();

  useEffect(() => {
    setIsValidDate(new Date(currentDay) >= new Date().setHours(0, 0, 0, 0));
  }, [currentDay]);

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
    switch (category) {
      case 'to-do':
        return setTasksToMap(tasks.filter((task) => task.category === 'to-do'));

      case 'in progress':
        return setTasksToMap(
          tasks.filter((task) => task.category === 'in progress'),
        );

      case 'done':
        return setTasksToMap(tasks.filter((task) => task.category === 'done'));
    }
  }, [category, tasks]);

  return (
    <div
      ref={isValidDate ? drop : null}
      className={clsx(
        css.tasksColumn,
        isOver ? css.boxDrop : null,
        tasksToMap.length > 3 ? css.tasksColumnScroll : null,
      )}
    >
      <ColumnHeadBar title={title} onClick={onOpen} isValidDate={isValidDate} />
      <ColumnsTasksList tasksToMap={tasksToMap} isValidDate={isValidDate} />
      {isValidDate && (
        <AddTaskButton onClick={onOpen}>
          {t('calendar.chosenday.taskColumns.addBtn')}
        </AddTaskButton>
      )}

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

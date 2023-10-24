import css from './styles/TasksColumnsList.module.css';
import { useParams } from 'react-router-dom';
import TasksColumn from './TasksColumn';
import { useTranslation } from 'react-i18next';
import PropTypes, { object } from 'prop-types';

function TasksColumnsList({ tasks }) {
  const { t } = useTranslation();

  const categories = [
    {
      category: 'to-do',
      title: t('calendar.chosenday.taskColumns.titles.to-do'),
    },
    {
      category: 'in progress',
      title: t('calendar.chosenday.taskColumns.titles.in progress'),
    },
    {
      category: 'done',
      title: t('calendar.chosenday.taskColumns.titles.done'),
    },
  ];

  const { currentDay } = useParams();

  const tasksByDay = tasks.filter((task) => task.date.includes(currentDay));

  return (
    <div className={css.tasksList}>
      {categories.map((t) => (
        <TasksColumn
          key={t.category}
          category={t.category}
          title={t.title}
          date={currentDay}
          tasks={tasksByDay}
        />
      ))}
    </div>
  );
}

TasksColumnsList.propTypes = {
  tasks: PropTypes.arrayOf(object),
};

export default TasksColumnsList;

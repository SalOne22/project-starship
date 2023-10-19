import { useTasks } from '@/modules/Calendar/hooks/useTasks';
import { useDispatch } from 'react-redux';
import css from './styles/TasksColumnsList.module.css';
import { useParams } from 'react-router-dom';
import TasksColumn from './TasksColumn';
import { useEffect } from 'react';
import { fetchTasks } from '@/modules/Calendar/redux/operations';
import { useTranslation } from 'react-i18next';

function TasksColumnsList() {
  const { tasks } = useTasks();
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(fetchTasks(currentDay.slice(0, 7)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDay.slice(0, 7), dispatch]);
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

export default TasksColumnsList;

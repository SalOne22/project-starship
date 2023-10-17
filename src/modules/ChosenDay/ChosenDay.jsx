import { useTasks } from '../Calendar/hooks/useTasks';
import css from './ChosenDay.module.css';
import TasksColumn from '../TasksColumn';
import CalendarToolbar from '../CalendarToolbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DatePaginator from '../CalendarToolbar/components/DatePaginator';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const categories = ['to-do', 'in progress', 'done'];

function ChosenDay() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { tasks } = useTasks();
  const navigate = useNavigate();

  const { currentDay } = useParams();

  const tasksByDay = tasks.filter((task) => task.date.includes(currentDay));

  const changeCurrentDate = (date) => {
    setCurrentDate(new Date(date));
  };

  useEffect(() => {
    changeCurrentDate(new Date(currentDay));
  }, [currentDay]);

  const prevDay = () => {
    const currentDateCopy = new Date(currentDate);
    currentDateCopy.setDate(currentDateCopy.getDate() - 1);

    navigate(
      `/calendar/day/${new Date(currentDateCopy).toISOString().slice(0, 10)}`,
    );
  };
  const nextDay = () => {
    const nextDayDate = new Date(currentDate);
    nextDayDate.setDate(nextDayDate.getDate() + 1);
    navigate(
      `/calendar/day/${new Date(nextDayDate).toISOString().slice(0, 10)}`,
    );
  };

  return (
    <div>
      <CalendarToolbar
        prevDate={prevDay}
        nextDate={nextDay}
        currentDate={currentDate}
        isDisabled={false}
      />
      <DatePaginator currentDate={currentDate} isDateShown={true} />

      <DndProvider backend={HTML5Backend}>
        <div className={css.chosenDay}>
          {categories.map((t) => (
            <TasksColumn
              key={t}
              category={t}
              date={currentDay}
              tasks={tasksByDay}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
}

export default ChosenDay;

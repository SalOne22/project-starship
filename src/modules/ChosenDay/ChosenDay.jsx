import CalendarToolbar from '../CalendarToolbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DatePaginator from '../CalendarToolbar/components/DatePaginator';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TasksColumnsList from '../TasksColumn/TasksColumnsList';
import css from './ChosenDay.module.css';

function ChosenDay() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigate = useNavigate();

  const { currentDay } = useParams();

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
    <div className={css.calendar}>
      <CalendarToolbar
        prevDate={prevDay}
        nextDate={nextDay}
        currentDate={currentDate}
        isDisabled={false}
      />
      <DatePaginator currentDate={currentDate} isDateShown={true} />
      <DndProvider backend={HTML5Backend}>
        <TasksColumnsList />
      </DndProvider>
    </div>
  );
}

export default ChosenDay;

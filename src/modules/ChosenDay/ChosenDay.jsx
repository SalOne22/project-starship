import CalendarToolbar from '../CalendarToolbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DatePaginator from '../CalendarToolbar/components/DatePaginator';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TasksColumnsList from '../TasksColumn/TasksColumnsList';
import css from './ChosenDay.module.css';
import { useTasks } from '../Calendar/hooks/useTasks';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../Calendar/redux/operations';
import { useMemo } from 'react';

function ChosenDay() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { tasks } = useTasks();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentDay } = useParams();
  const slice = useMemo(() => currentDay.slice(0, 7), [currentDay]);

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

  const onChangeCalendar = (val) => {
    setCurrentDate(val);

    const nextDay = new Date(val);
    nextDay.setDate(val.getDate() + 1);
    const nextDayString = nextDay.toISOString().slice(0, 10);
    navigate(`/calendar/day/${nextDayString}`);
  };

  useEffect(() => {
    dispatch(fetchTasks(slice));
  }, [slice, dispatch]);

  return (
    <div className={css.wrapper}>
      <CalendarToolbar
        prevDate={prevDay}
        nextDate={nextDay}
        currentDate={currentDate}
        onChangeCalendar={onChangeCalendar}
        mode="day"
      />
      <DatePaginator currentDate={currentDate} isDateShown={true} />
      <DndProvider backend={HTML5Backend}>
        <TasksColumnsList tasks={tasks} />
      </DndProvider>
    </div>
  );
}

export default ChosenDay;

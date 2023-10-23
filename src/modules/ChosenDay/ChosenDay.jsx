import CalendarToolbar from '../CalendarToolbar';
import { DatePicker } from '@mantine/dates';
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
  const [openedCalendar, setOpenedCalendar] = useState(false);
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
    setOpenedCalendar(false);
  };

  useEffect(() => {
    dispatch(fetchTasks(slice));
  }, [slice, dispatch]);

  return (
    <div className={css.wrapper}>
      <div className={css.thumb}>
        <CalendarToolbar
          prevDate={prevDay}
          nextDate={nextDay}
          currentDate={currentDate}
          isDisabled={false}
          openedCalendar={setOpenedCalendar}
        />
        {openedCalendar && (
          <DatePicker
            defaultDate={currentDate}
            value={currentDate}
            onChange={onChangeCalendar}
            hideOutsideDates
            className={css.datePicker}
            classNames={{
              calendarHeaderControl: css.calendarHeaderControl,
              calendarHeaderLevel: css.calendarHeaderLevel,
              yearsListCell: css.yearsListCell,
              monthsListCell: css.monthsListCell,
              weekday: css.weekday,
              day: css.day,
            }}
          />
        )}
      </div>

      <DatePaginator currentDate={currentDate} isDateShown={true} />
      <DndProvider backend={HTML5Backend}>
        <TasksColumnsList tasks={tasks} />
      </DndProvider>
    </div>
  );
}

export default ChosenDay;

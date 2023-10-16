import { useEffect, useState } from 'react';
import css from './ChosenMonth.module.css';
import CalendarDay from '../CalendarDay';
import CalendarToolbar from '../CalendarToolbar';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../Calendar/redux/operations';
import DatePaginator from '../CalendarToolbar/components/DatePaginator';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../Calendar/hooks/useTasks';

const ChosenMonth = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDisabled, setIsDisabled] = useState(true);

  const { isLoading } = useTasks();
  const navigate = useNavigate();
  const { currentMonth } = useParams();

  const dispatch = useDispatch();

  const changeCurrentDate = (date) => {
    setCurrentDate(new Date(date.year, date.month, date.number));
  };

  useEffect(() => {
    dispatch(fetchTasks(currentMonth));
  }, [dispatch, currentDate, currentMonth]);

  const nextMonth = () => {
    setIsDisabled(false);
    const nextMonthDate = new Date(currentDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    setCurrentDate(nextMonthDate);
    navigate(
      `/calendar/month/${new Date(nextMonthDate).toISOString().slice(0, 7)}`,
    );
  };

  const prevMonth = () => {
    const currentDateCopy = new Date(currentDate);
    currentDateCopy.setMonth(currentDateCopy.getMonth() - 1);
    setCurrentDate(currentDateCopy);

    const today = new Date();
    if (
      currentDateCopy.getMonth() === today.getMonth() &&
      currentDateCopy.getFullYear() === today.getFullYear()
    ) {
      setIsDisabled(true);
    }
    navigate(
      `/calendar/month/${new Date(currentDateCopy).toISOString().slice(0, 7)}`,
    );
  };

  if (isLoading) {
    return <p>Loading</p>;
  } else {
    return (
      <div className={css.calendar}>
        <CalendarToolbar
          nextDate={nextMonth}
          prevDate={prevMonth}
          currentDate={currentDate}
          isDisabled={isDisabled}
        />
        <div className={css.calendarBody}>
          <DatePaginator currentDate={currentDate} isDateShown={false} />
          <CalendarDay
            day={currentDate}
            changeCurrentDate={changeCurrentDate}
          />
        </div>
      </div>
    );
  }
};

export default ChosenMonth;

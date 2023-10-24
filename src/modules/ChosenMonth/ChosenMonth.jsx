import { useEffect, useState } from 'react';
import css from './ChosenMonth.module.css';
import CalendarDay from '../CalendarDay';
import CalendarToolbar from '../CalendarToolbar';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../Calendar/redux/operations';
import DatePaginator from '../CalendarToolbar/components/DatePaginator';
import { useNavigate, useParams } from 'react-router-dom';

const ChosenMonth = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

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
    navigate(
      `/calendar/month/${new Date(currentDateCopy).toISOString().slice(0, 7)}`,
    );
  };

  const onChangeCalendar = (val) => {
    const pickedDate = new Date(val);

    const newDateObj = {
      year: pickedDate.getFullYear(),
      month: pickedDate.getMonth(),
      number: currentDate.getDate(),
    };

    changeCurrentDate(newDateObj);

    const nextMonth = new Date(val);
    nextMonth.setMonth(val.getMonth() + 1);
    const nextMonthString = nextMonth.toISOString().slice(0, 7);
    navigate(`/calendar/month/${nextMonthString}`);
  };

  return (
    <div className={css.wrapper}>
      <CalendarToolbar
        nextDate={nextMonth}
        prevDate={prevMonth}
        currentDate={currentDate}
        onChangeCalendar={onChangeCalendar}
        mode="month"
      />

      <DatePaginator currentDate={currentDate} isDateShown={false} />
      <CalendarDay day={currentDate} changeCurrentDate={changeCurrentDate} />
    </div>
  );
};

export default ChosenMonth;

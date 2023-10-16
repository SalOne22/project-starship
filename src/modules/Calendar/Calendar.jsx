import { useEffect, useState } from 'react';
import css from './Calendar.module.css';
import CalendarDay from '../CalendarDay';
import { useDispatch } from 'react-redux';
import { fetchTasks } from './redux/operations';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDisabled, setIsDisabled] = useState(true);
  const [daysCounter, setDaysCounter] = useState(0);

  const dispatch = useDispatch();

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  useEffect(() => {
    let counter = 0;
    if (currentDate.getDate() !== 1 && currentDate.getDay() + 1 === 1) {
      //console.log(currentDate.getDate() - 6);
      counter = currentDate.getDate() - 6;
    } else if (currentDate.getDate() === 1) {
      //console.log(currentDate.getDate());
      counter = currentDate.getDate();
    } else {
      //console.log(currentDate.getDate() - currentDate.getDay() + 1);
      counter = currentDate.getDate() - currentDate.getDay() + 1;
    }
    setDaysCounter(counter);
  }, [currentDate]);

  const changeCurrentDate = (date) => {
    setCurrentDate(new Date(date.year, date.month, date.number));
  };

  useEffect(() => {
    const data = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`;
    console.log(data);
    dispatch(fetchTasks(data));
  }, [dispatch, currentDate]);

  const nextMonth = () => {
    setIsDisabled(false);
    const nextMonthDate = new Date(currentDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    setCurrentDate(nextMonthDate);
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
  };

  return (
    <div className={css.calendar}>
      <div className={css.tools}>
        <button>{`${
          months[currentDate.getMonth()]
        } ${currentDate.getFullYear()}`}</button>
        <button onClick={prevMonth} disabled={isDisabled}>
          arrow_back
        </button>
        <button onClick={nextMonth}>arrow_forward</button>
      </div>
      <div className={css.calendarBody}>
        <ul className={css.tableHeader}>
          {weekdays.map((weekday, index) => {
            return (
              <li className={css.weekday} key={weekday}>
                <p>{weekday}</p>
                <span
                  className={
                    currentDate.getDate() === daysCounter + index
                      ? css.selectedDay
                      : null
                  }
                >
                  {daysCounter + index}
                </span>
              </li>
            );
          })}
        </ul>
        <CalendarDay day={currentDate} changeCurrentDate={changeCurrentDate} />
      </div>
    </div>
  );
};

export default Calendar;

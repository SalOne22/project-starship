import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import css from '../CalendarToolbar.module.css';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const DatePaginator = ({ currentDate, isDateShown }) => {
  const [daysCounter, setDaysCounter] = useState([]);
  const navigate = useNavigate();

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    function generateWeekDates(startDate) {
      const weekDates = [];

      const startDayIndex = weekdays.indexOf(
        startDate.toLocaleString('en-us', { weekday: 'short' }),
      );

      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);

        date.setDate(startDate.getDate() - (startDayIndex - i));
        weekDates.push(date);
      }

      return weekDates;
    }

    const weekDates = generateWeekDates(currentDate);
    setDaysCounter(weekDates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  const pickDay = (date) => {
    date.setDate(date.getDate());
    navigate(`/calendar/day/${date.toISOString().slice(0, 10)}`);
  };

  return (
    <ul className={css.tableHeader}>
      {weekdays.map((weekday, index) => {
        const dayOfweek = daysCounter[index];
        const date = new Date(dayOfweek);
        return (
          <li
            className={clsx(css.weekday, isDateShown && css.clickable)}
            key={weekday}
            onClick={() => {
              isDateShown && pickDay(date);
            }}
          >
            <p className={css.dayNum}>{weekday}</p>

            {isDateShown && (
              <span
                className={
                  currentDate.getDate() === date.getDate()
                    ? css.selectedDay
                    : null
                }
              >
                {date.getDate().toString()}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default DatePaginator;

DatePaginator.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  isDateShown: PropTypes.bool.isRequired,
};

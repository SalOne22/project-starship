import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import css from '../CalendarToolbar.module.css';

const DatePaginator = ({ currentDate, isDateShown }) => {
  const [daysCounter, setDaysCounter] = useState([]);

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

  return (
    <ul className={css.tableHeader}>
      {weekdays.map((weekday, index) => {
        return (
          <li className={css.weekday} key={weekday}>
            <p className={css.dayNum}>{weekday}</p>

            {isDateShown && (
              <span
                className={
                  currentDate.getDate() ===
                  new Date(daysCounter[index]).getDate()
                    ? css.selectedDay
                    : null
                }
              >
                {new Date(daysCounter[index]).getDate()}
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

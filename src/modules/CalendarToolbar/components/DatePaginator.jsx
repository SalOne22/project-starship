import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import css from '../CalendarToolbar.module.css';

const DatePaginator = ({ currentDate, isDateShown }) => {
  const [daysCounter, setDaysCounter] = useState(0);

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    let counter = 0;
    if (currentDate.getDate() !== 1 && currentDate.getDay() + 1 === 1) {
      counter = currentDate.getDate() - 6;
    } else if (currentDate.getDate() === 1) {
      counter = currentDate.getDate();
    } else {
      counter = currentDate.getDate() - currentDate.getDay() + 1;
    }
    setDaysCounter(counter);
  }, [currentDate]);

  return (
    <ul className={css.tableHeader}>
      {weekdays.map((weekday, index) => {
        return (
          <li className={css.weekday} key={weekday}>
            <p>{weekday}</p>
            {isDateShown && (
              <span
                className={
                  currentDate.getDate() === daysCounter + index
                    ? css.selectedDay
                    : null
                }
              >
                {daysCounter + index}
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

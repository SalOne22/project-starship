import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import css from '../CalendarToolbar.module.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import clsx from 'clsx';
import { useMediaQuery } from '@mantine/hooks';
import { em } from '@mantine/core';

const DatePaginator = ({ currentDate, isDateShown }) => {
  const [daysCounter, setDaysCounter] = useState([]);
  const isMobile = useMediaQuery(`(max-width: ${em(475)})`);

  const navigate = useNavigate();

  const { t } = useTranslation();
  const weekdays = t('calendar.weekdays', {
    returnObjects: true,
  });

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
            <p className={css.dayNum}>{isMobile ? weekday[0] : weekday}</p>

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

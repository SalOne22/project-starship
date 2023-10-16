import { useTasks } from '../Calendar/hooks/useTasks';
import PropTypes from 'prop-types';
import css from './CalendarDay.module.css';

const CalendarDay = ({ day, changeCurrentDate }) => {
  const { tasks } = useTasks();

  const firstDayOfMonth = new Date(day.getFullYear(), day.getMonth(), 1);
  console.log(firstDayOfMonth.getDay());
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  console.log(weekdayOfFirstDay);
  const daysInWeek = 7;

  const daysToSkip = (weekdayOfFirstDay - 2 + daysInWeek) % daysInWeek;

  let currentDays = [];

  let startDate = new Date(firstDayOfMonth - 1);

  startDate.setDate(startDate.getDate() - daysToSkip);

  for (let d = 0; d < 42; d++) {
    console.log(startDate.toDateString(), day.toDateString());
    const calendarDay = {
      currentMonth: startDate.getMonth() === day.getMonth(),
      date: new Date(startDate).toISOString().slice(0, 10),
      month: startDate.getMonth(),
      number: startDate.getDate(),
      selected: startDate.toDateString() === day.toDateString(),
      year: startDate.getFullYear(),
      tasks: [],
    };

    tasks?.map((task) => {
      if (task.date === calendarDay.date) {
        console.log(task.date, calendarDay.date);
        calendarDay.tasks.push(task);
      }
    });

    currentDays.push(calendarDay);

    startDate.setDate(startDate.getDate() + 1);
  }

  console.log('day: ' + day);

  return (
    <ul className={css.calendarDaysWrapper}>
      {currentDays.map((day) => {
        return (
          <li
            onClick={() => changeCurrentDate(day)}
            className={css.calendarDay}
            key={day.date}
          >
            <span
              className={`${day.selected && css.selectedDay} ${
                !day.currentMonth && css.otherDays
              }`}
            >
              {day.number}
            </span>

            {day.tasks.length > 0 && (
              <ul>
                {day.tasks.map((task) => (
                  <li key={task._id}>{task.title}</li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default CalendarDay;

CalendarDay.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  changeCurrentDate: PropTypes.func.isRequired,
};

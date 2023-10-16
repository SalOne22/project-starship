import PropTypes from 'prop-types';
import PeriodPaginator from '../../components/PeriodPaginator';
import css from './CalendarToolbar.module.css';
import PeriodTypeSelect from './components/PeriodTypeSelect';

function CalendarToolbar({ prevDate, nextDate, currentDate, isDisabled }) {
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

  const nameOfDate = `${
    months[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;

  return (
    <div className={css.tools}>
      <PeriodPaginator
        nameOfDate={nameOfDate}
        prevDate={prevDate}
        nextDate={nextDate}
        isDisabled={isDisabled}
      />
      <PeriodTypeSelect currentDate={currentDate} />
    </div>
  );
}

export default CalendarToolbar;

CalendarToolbar.propTypes = {
  prevDate: PropTypes.func.isRequired,
  nextDate: PropTypes.func.isRequired,
  currentDate: PropTypes.instanceOf(Date).isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

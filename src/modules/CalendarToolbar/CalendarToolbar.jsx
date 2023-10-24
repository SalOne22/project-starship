import PropTypes from 'prop-types';
import PeriodPaginator from '../../components/PeriodPaginator';
import css from './CalendarToolbar.module.css';
import PeriodTypeSelect from './components/PeriodTypeSelect';
import { useTranslation } from 'react-i18next';

function CalendarToolbar({ prevDate, nextDate, currentDate, openCalendar }) {
  const { t } = useTranslation();
  const months = t('calendar.months', {
    returnObjects: true,
  });
  const days = t('calendar.weekdays', {
    returnObjects: true,
  });

  const { pathname } = window.location;

  const normalizedDays = () => {
    if (!pathname.includes('day')) return '';

    if (currentDate.getDay() === 0) {
      return days[6];
    }

    return days[currentDate.getDay() - 1];
  };

  const nameOfDate = `${normalizedDays()} ${
    months[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;

  return (
    <div className={css.tools}>
      <PeriodPaginator
        nameOfDate={nameOfDate}
        prevDate={prevDate}
        nextDate={nextDate}
        openCalendar={openCalendar}
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
  openCalendar: PropTypes.func,
};

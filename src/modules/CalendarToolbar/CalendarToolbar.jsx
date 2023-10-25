import PropTypes from 'prop-types';
import PeriodPaginator from '../../components/PeriodPaginator';
import css from './CalendarToolbar.module.css';
import PeriodTypeSelect from './components/PeriodTypeSelect';
import { useTranslation } from 'react-i18next';

function CalendarToolbar({
  prevDate,
  nextDate,
  currentDate,
  onChangeCalendar,
  mode,
}) {
  const { t } = useTranslation();
  const months = t('calendar.months', {
    returnObjects: true,
  });

  const { pathname } = window.location;

  const nameOfDate = `${
    pathname.includes('day') ? currentDate.getDate() : ''
  } ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  return (
    <div className={css.tools}>
      <PeriodPaginator
        nameOfDate={nameOfDate}
        prevDate={prevDate}
        nextDate={nextDate}
        onChangeCalendar={onChangeCalendar}
        mode={mode}
        currentDate={currentDate}
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
  onChangeCalendar: PropTypes.func,
  mode: PropTypes.string,
};

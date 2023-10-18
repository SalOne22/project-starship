import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import css from '../CalendarToolbar.module.css';
import clsx from 'clsx';

function PeriodTypeSelect() {
  const navigate = useNavigate();
  const { pathname } = window.location;
  const { t } = useTranslation();

  const tabsToggler = (tabName) => {
    if (tabName === 'month') {
      navigate(`/calendar/month/${new Date().toISOString().slice(0, 7)}`);
    } else {
      navigate(`/calendar/day/${new Date().toISOString().slice(0, 10)}`);
    }
  };

  return (
    <div className={css.periodTypeWrapper}>
      <button
        className={clsx(
          css.periodType,
          css.periodLeft,
          pathname.includes('month') ? css.activePeriod : null,
        )}
        onClick={() => {
          tabsToggler('month');
        }}
      >
        {t('calendar.periodSelect.month')}
      </button>
      <button
        className={clsx(
          css.periodType,
          css.periodRight,
          pathname.includes('day') ? css.activePeriod : null,
        )}
        onClick={() => {
          tabsToggler('day');
        }}
      >
        {t('calendar.periodSelect.day')}
      </button>
    </div>
  );
}

export default PeriodTypeSelect;

PeriodTypeSelect.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
};

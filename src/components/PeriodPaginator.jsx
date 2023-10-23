import PropTypes from 'prop-types';
import css from './styles/PeriodPaginator.module.css';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';

function PeriodPaginator({ nameOfDate, prevDate, nextDate, openedCalendar }) {
  return (
    <div className={css.periodPaginatorWrapper}>
      <button className={css.dateBtn} onClick={() => openedCalendar(true)}>
        {nameOfDate}
      </button>
      <div className={css.iconWrapper}>
        <button
          className={clsx(css.iconArrow, css.iconLeft)}
          onClick={prevDate}
        >
          <IconChevronLeft className={css.icon} />
        </button>
        <button
          className={clsx(css.iconArrow, css.iconRight)}
          onClick={nextDate}
        >
          <IconChevronRight className={css.icon} />
        </button>
      </div>
    </div>
  );
}

export default PeriodPaginator;

PeriodPaginator.propTypes = {
  nameOfDate: PropTypes.string.isRequired,
  prevDate: PropTypes.func.isRequired,
  nextDate: PropTypes.func.isRequired,
  openedCalendar: PropTypes.func,
};

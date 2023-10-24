import PropTypes from 'prop-types';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';

import { Popover } from '@mantine/core';
import { DatePicker, MonthPicker } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import 'dayjs/locale/uk';
import 'dayjs/locale/en';

import css from './styles/PeriodPaginator.module.css';

function PeriodPaginator({
  nameOfDate,
  prevDate,
  nextDate,
  onChangeCalendar,
  mode,
  currentDate,
}) {
  const [opened, { close, toggle }] = useDisclosure(false);
  const { i18n } = useTranslation();

  const onDateChange = (val) => {
    onChangeCalendar(val);
    close();
  };

  return (
    <div className={css.periodPaginatorWrapper}>
      <Popover
        opened={opened}
        onChange={toggle}
        position="bottom-start"
        offset={8}
        trapFocus
        clickOutsideEvents={['mouseup', 'touchend']}
        transitionProps={{ transition: 'rotate-right', duration: 300 }}
        classNames={{
          dropdown: css.dropdown,
          item: css.item,
        }}
      >
        <Popover.Target>
          <button className={css.dateBtn} onClick={toggle}>
            {nameOfDate}
          </button>
        </Popover.Target>

        <Popover.Dropdown>
          {mode === 'day' && (
            <DatePicker
              locale={i18n.language === 'en' ? 'en' : 'uk'}
              defaultDate={nameOfDate}
              value={nameOfDate}
              onChange={onDateChange}
              hideOutsideDates
              size="sm"
              classNames={{
                calendarHeaderControl: css.calendarHeaderControl,
                calendarHeaderLevel: css.calendarHeaderLevel,
                yearsListCell: css.yearsListCell,
                monthsListCell: css.monthsListCell,
                weekday: css.weekday,
                day: css.day,
              }}
            />
          )}
          {mode === 'month' && (
            <MonthPicker
              locale={i18n.language === 'en' ? 'en' : 'uk'}
              defaultDate={currentDate}
              value={currentDate}
              onChange={onDateChange}
              hideOutsideDates
              size="sm"
              classNames={{
                calendarHeaderControl: css.calendarHeaderControl,
                calendarHeaderLevel: css.calendarHeaderLevel,
                yearsListCell: css.yearsListCell,
                monthsListCell: css.monthsListCell,
                weekday: css.weekday,
                day: css.day,
              }}
            />
          )}
        </Popover.Dropdown>
      </Popover>
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
  onChangeCalendar: PropTypes.func,
  mode: PropTypes.string,
  currentDate: PropTypes.object,
};

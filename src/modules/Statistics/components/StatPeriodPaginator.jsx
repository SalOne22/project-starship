import PropTypes from 'prop-types';
import classes from '../styles/StatPeriodPaginator.module.css';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';
import { DatePicker } from '@mantine/dates';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { useTranslation } from 'react-i18next';

export function StatPeriodPaginator({
  currentDate,
  setCurrentDate,
  variant = 'day',
}) {
  const { i18n } = useTranslation();
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState(currentDate);
  const valueFormat = variant === 'day' ? 'D MMMM YYYY' : 'MMMM YYYY';
  const locale = i18n.language === 'ua' ? 'uk' : 'en';

  const onChangeCalendar = (val) => {
    setDatePickerValue(val);
    setIsDatePicker(false);
  };

  const onPrev = () => {
    setDatePickerValue(dayjs(datePickerValue).subtract(1, variant));
  };

  const onNext = () => {
    setDatePickerValue(dayjs(datePickerValue).add(1, variant));
  };

  useEffect(() => {
    if (currentDate !== datePickerValue) {
      setCurrentDate(datePickerValue);
    }
  }, [currentDate, datePickerValue, setCurrentDate]);

  console.log('render PeriodPaginator');
  return (
    <div className={classes.periodPaginatorWrapper}>
      <button className={classes.dateBtn} onClick={() => setIsDatePicker(true)}>
        {dayjs(currentDate).locale(locale).format(valueFormat)}
      </button>
      {isDatePicker && (
        <DatePicker
          value={datePickerValue}
          onChange={onChangeCalendar}
          locale={locale}
          hideOutsideDates
          className={classes.datePicker}
          classNames={{
            calendarHeaderControl: classes.calendarHeaderControl,
            calendarHeaderLevel: classes.calendarHeaderLevel,
            yearsListCell: classes.yearsListCell,
            monthsListCell: classes.monthsListCell,
            month: classes.month,
            weekday: classes.weekday,
            day: classes.day,
          }}
        />
      )}
      <div className={classes.iconWrapper}>
        <button
          className={clsx(classes.iconArrow, classes.iconLeft)}
          onClick={onPrev}
        >
          <IconChevronLeft className={classes.icon} />
        </button>
        <button
          className={clsx(classes.iconArrow, classes.iconRight)}
          onClick={onNext}
        >
          <IconChevronRight className={classes.icon} />
        </button>
      </div>
    </div>
  );
}

StatPeriodPaginator.propTypes = {
  currentDate: PropTypes.object,
  setCurrentDate: PropTypes.func,
  variant: PropTypes.string,
};

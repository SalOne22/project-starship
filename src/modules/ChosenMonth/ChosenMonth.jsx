import { useDisclosure } from '@mantine/hooks';

import { MonthPicker } from '@mantine/dates';
import { useEffect, useState } from 'react';
import css from './ChosenMonth.module.css';
import CalendarDay from '../CalendarDay';
import CalendarToolbar from '../CalendarToolbar';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../Calendar/redux/operations';
import DatePaginator from '../CalendarToolbar/components/DatePaginator';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'dayjs/locale/uk';
import 'dayjs/locale/en';
import { Modal } from '@mantine/core';

const ChosenMonth = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [opened, { open, close }] = useDisclosure(false);
  const { i18n } = useTranslation();

  const navigate = useNavigate();
  const { currentMonth } = useParams();

  const dispatch = useDispatch();

  const changeCurrentDate = (date) => {
    setCurrentDate(new Date(date.year, date.month, date.number));
  };

  useEffect(() => {
    dispatch(fetchTasks(currentMonth));
  }, [dispatch, currentDate, currentMonth]);

  const nextMonth = () => {
    const nextMonthDate = new Date(currentDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    setCurrentDate(nextMonthDate);
    navigate(
      `/calendar/month/${new Date(nextMonthDate).toISOString().slice(0, 7)}`,
    );
  };

  const prevMonth = () => {
    const currentDateCopy = new Date(currentDate);
    currentDateCopy.setMonth(currentDateCopy.getMonth() - 1);
    setCurrentDate(currentDateCopy);
    navigate(
      `/calendar/month/${new Date(currentDateCopy).toISOString().slice(0, 7)}`,
    );
  };

  const onChangeCalendar = (val) => {
    const pickedDate = new Date(val);

    const newDateObj = {
      year: pickedDate.getFullYear(),
      month: pickedDate.getMonth(),
      number: currentDate.getDate(),
    };

    changeCurrentDate(newDateObj);
    close();

    const nextMonth = new Date(val);
    nextMonth.setMonth(val.getMonth() + 1);
    const nextMonthString = nextMonth.toISOString().slice(0, 7);
    navigate(`/calendar/month/${nextMonthString}`);
  };

  return (
    <>
      <div className={css.wrapper}>
        <CalendarToolbar
          nextDate={nextMonth}
          prevDate={prevMonth}
          currentDate={currentDate}
          openCalendar={open}
        />

        <DatePaginator currentDate={currentDate} isDateShown={false} />
        <CalendarDay day={currentDate} changeCurrentDate={changeCurrentDate} />
      </div>

      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size="auto"
        classNames={{
          content: css.modalContent,
        }}
        transitionProps={{ duration: 300, transition: 'fade' }}
      >
        <MonthPicker
          locale={i18n.language === 'en' ? 'en' : 'uk'}
          defaultDate={currentDate}
          value={currentDate}
          onChange={onChangeCalendar}
          hideOutsideDates
          classNames={{
            calendarHeaderControl: css.calendarHeaderControl,
            calendarHeaderLevel: css.calendarHeaderLevel,
            yearsListCell: css.yearsListCell,
            monthsListCell: css.monthsListCell,
            weekday: css.weekday,
            day: css.day,
          }}
        />
      </Modal>
    </>
  );
};

export default ChosenMonth;

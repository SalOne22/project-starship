import {
  Chart,
  ChartTitle,
  ChartWrapper,
  Legend,
  ResponsiveChartWrapper,
  Wrapper,
} from './components';
import { Box, Container, Flex, Loader, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTasks } from '@/modules/Calendar/hooks/useTasks';
import { fetchTasks } from '@/modules/Calendar/redux/operations';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getChartData, translateDataItemsNames } from './helpers';
import { useTranslation } from 'react-i18next';
import classes from './styles/Statistics.module.css';
import PeriodPaginator from '@/components/PeriodPaginator';

function Statistics() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const types = t('statistics.types', {
    returnObjects: true,
  });
  const { tasks, isLoading, error } = useTasks();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [currentMonth, setCurrentMonth] = useState(
    tasks[0] ? dayjs(tasks[0].date).format('YYYY-MM') : 0,
  );
  const [hasFetchedDate, setHasFetchedDate] = useState(false);
  const currentDay = dayjs(currentDate).format('YYYY-MM-DD');
  const locale = useMemo(() => {
    return i18n.language === 'en' ? 'en' : 'uk';
  }, [i18n.language]);
  const nameOfDate = dayjs(currentDate).locale(locale).format('DD MMMM YYYY');
  const isChangedMonth = dayjs(currentDate).format('YYYY-MM') !== currentMonth;

  const prevDay = () => {
    setCurrentDate(dayjs(currentDate).subtract(1, 'day'));
  };

  const nextDay = () => {
    setCurrentDate(dayjs(currentDate).add(1, 'day'));
  };

  useEffect(() => {
    const fetchTasksData = () => {
      dispatch(fetchTasks(dayjs(currentDate).format('YYYY-MM')));
      setCurrentMonth(dayjs(currentDate).format('YYYY-MM'));
      setHasFetchedDate(true);
    };
    if (
      tasks.length === 0 &&
      hasFetchedDate &&
      !isChangedMonth &&
      !isLoading &&
      !error
    ) {
      return;
    }
    if (
      (tasks.length === 0 && !hasFetchedDate && !isLoading) ||
      (isChangedMonth && !isLoading && !error)
    ) {
      fetchTasksData();
    }
  }, [
    dispatch,
    hasFetchedDate,
    tasks,
    isLoading,
    error,
    isChangedMonth,
    currentDate,
  ]);

  let content = (
    <Flex justify="center" align="center" mih="400px">
      <Loader color="blue" />
    </Flex>
  );

  if (tasks.length === 0 && !isLoading) {
    if (hasFetchedDate) {
      content = <Text>{t('statistics.errors.nullTasks')}</Text>;
    } else {
      return null;
    }
  }

  if (isChangedMonth && !isLoading && !error) {
    return null;
  }

  if (tasks.length > 0 && !isLoading && !error) {
    const dataForChart = translateDataItemsNames(
      getChartData(tasks, currentDay),
      types,
    );
    content = (
      <>
        <ChartTitle>{t('statistics.tasks')}</ChartTitle>
        <ResponsiveChartWrapper>
          <Chart data={dataForChart} />
        </ResponsiveChartWrapper>
      </>
    );
  }

  return (
    <>
      {error &&
        notifications.show({
          title: t('statistics.errors.wrong'),
          message: error.message,
          color: 'red',
        })}

      <Container className={classes.stat__container}>
        <Wrapper>
          <Box className={classes.stat__header}>
            <PeriodPaginator
              nameOfDate={nameOfDate}
              prevDate={prevDay}
              nextDate={nextDay}
              onChangeCalendar={setCurrentDate}
              currentDate={currentDate}
              mode="day"
            />
            <Legend />
          </Box>
          <ChartWrapper>{content}</ChartWrapper>
        </Wrapper>
      </Container>
    </>
  );
}

export default Statistics;

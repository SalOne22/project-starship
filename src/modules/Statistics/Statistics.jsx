import PeriodPaginator from '@/components/PeriodPaginator';
import {
  Chart,
  ChartTitle,
  ChartWrapper,
  Legend,
  ResponsiveChartWrapper,
  Wrapper,
} from './components';
import { Box, Container } from '@mantine/core';
import ScreenLoader from '@/components/ScreenLoader';
import { useTasks } from '@/modules/Calendar/hooks/useTasks';
import { fetchTasks } from '@/modules/Calendar/redux/operations';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classes from './Statistics.module.css';
import { getChartData } from './helpers';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';

// import mockTasks from './mockData/tasks.json';

function Statistics() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { tasks, isLoading, error } = useTasks();
  // const [isTasks, setIsTasks] = useState(true);
  // useSelector((state) => state?.calendar?.currentDate) ?? dayjs();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const currentMonth = dayjs(currentDate).format('YYYY-MM');
  const currentDay = dayjs(currentDate).format('YYYY-MM-DD');
  const nameOfDate = dayjs(currentDate).format('DD MMMM YYYY');

  const prevDay = () => {
    setCurrentDate(currentDate.subtract(1, 'day'));
  };

  const nextDay = () => {
    setCurrentDate(currentDate.add(1, 'day'));
  };

  useEffect(() => {
    if (
      tasks.length > 0 &&
      currentMonth === dayjs(tasks[0].date).format('YYYY-MM') &&
      !isLoading
    ) {
      // console.log('Statements in Statistics useEffect');
      return;
    }

    dispatch(fetchTasks(currentMonth));
    // console.log('Statistics useEffect to get tasks');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, dispatch]);

  // useEffect(() => {
  //   if (tasks.length === 0 && !isLoading) {
  //     setIsTasks(false);
  //     console.log("Statistics useEffect to check if tasks aren't empty");
  //   } else {
  //     setIsTasks(true);
  //   }
  // }, [tasks.length, isLoading]);

  const dataForChart = getChartData(tasks, currentDay);

  // console.log('render', 'Statistics');
  // console.log('tasks', tasks);

  return (
    <>
      {isLoading && <ScreenLoader />}
      {error &&
        notifications.show({
          title: 'Bummer!',
          message: error.message,
          color: 'red',
          withCloseButton: true,
          autoClose: 5000,
        })}

      <Container className={classes.stat__container}>
        <Wrapper>
          <Box className={classes.stat__header}>
            <PeriodPaginator
              nameOfDate={nameOfDate}
              prevDate={prevDay}
              nextDate={nextDay}
            />
            <Legend />
          </Box>
          <ChartWrapper>
            <ChartTitle>{t('statistics.tasks')}</ChartTitle>
            {/* {!isTasks &&
              notifications.show({
                title: "You don't have any tasks for this month",
                color: 'orange',
                withCloseButton: true,
                autoClose: 5000,
              })}
            {isTasks && (
              <> */}
            <ResponsiveChartWrapper>
              <Chart data={dataForChart} />
            </ResponsiveChartWrapper>
            {/* </>
            )} */}
          </ChartWrapper>
        </Wrapper>
      </Container>
    </>
  );
}

export default Statistics;

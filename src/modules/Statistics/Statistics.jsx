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
import { useDispatch, useSelector } from 'react-redux';
import classes from './Statistics.module.css';
import {
  getTasksTypeDistribution,
  calculateTasksTypePercentage,
  getChartData,
} from './helpers';
import { notifications } from '@mantine/notifications';

// import mockTasks from './mockData/tasks.json';

function Statistics() {
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useTasks();
  const currentDate =
    useSelector((state) => state?.calendar?.currentDate) ?? dayjs();
  const currentDay = dayjs(currentDate).format('YYYY-MM-DD');
  const [currentMonth, setCurrentMonth] = useState(
    dayjs(currentDate).format('YYYY-MM'),
  );
  const byDay = (tasks) => tasks.date === currentDate;

  useEffect(() => {
    if (
      tasks.length > 0 &&
      currentMonth === dayjs(tasks[0].date).format('YYYY-MM') &&
      !isLoading
    ) {
      return;
    }

    dispatch(fetchTasks(currentMonth));
    console.log('Statistics useEffect to get tasks');
  }, [currentMonth, dispatch, isLoading, tasks]);

  //if tasks, getTaskTypeDistribution

  if (!tasks) {
    console.log('No tasks');
    return (
      <>
        {isLoading && <ScreenLoader />}
        {error &&
          notifications.show({
            title: 'Bummer!',
            message: error.message,
            color: 'red',
            withCloseButton: true,
          })}
      </>
    );
  }

  const dataForChart = getChartData(tasks, currentDay);

  console.log('render', 'Statistics');
  console.log('tasks', tasks);
  console.log(currentDay);
  console.log(currentMonth);

  console.log(
    'byDayPercentage',
    calculateTasksTypePercentage(getTasksTypeDistribution(tasks, byDay)),
  );
  console.log(
    'byMonthPercentage',
    calculateTasksTypePercentage(getTasksTypeDistribution(tasks)),
  );

  return (
    <>
      {isLoading && <ScreenLoader />}
      {error &&
        notifications.show({
          title: 'Bummer!',
          message: error.message,
          color: 'red',
          withCloseButton: true,
        })}

      <Container className={classes.stat__container}>
        <Wrapper>
          <Box className={classes.stat__header}>
            {/* <PeriodPaginator /> */}
            <Legend />
          </Box>
          <ChartWrapper>
            <ChartTitle>Tasks</ChartTitle>
            <ResponsiveChartWrapper>
              <Chart data={dataForChart} />
            </ResponsiveChartWrapper>
          </ChartWrapper>
        </Wrapper>
      </Container>
    </>
  );
}

export default Statistics;

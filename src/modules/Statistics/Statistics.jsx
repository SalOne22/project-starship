import PeriodPaginator from '@/components/PeriodPaginator';
import {
  Chart,
  ChartTitle,
  ChartWrapper,
  Legend,
  ResponsiveChartWrapper,
  Wrapper,
} from './components';
import { Box, Container, Notification, rem } from '@mantine/core';
import ScreenLoader from '@/components/ScreenLoader';
import { useTasks } from '@/modules/Calendar/hooks/useTasks';
import { fetchTasks } from '@/modules/Calendar/redux/operations';
import { IconX } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Statistics.module.css';
import {
  getTasksTypeDistribution,
  calculateTasksTypePercentage,
  getChartData,
} from './helpers';

// import mockTasks from './mockData/tasks.json';

function Statistics() {
  //icon for Notification
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;

  const dispatch = useDispatch();

  const selectedDayDate =
    useSelector((state) => state?.calendar?.selectedDayDate) ??
    dayjs(new Date(2023, 9, 31)).format('YYYY-MM-DD');
  const byDay = (tasks) => tasks.date === selectedDayDate;

  const { tasks, isLoading, error } = useTasks();

  //if not tasks, dispatch action to get tasks using selectedDayDate formated as YYYY-MM
  useEffect(() => {
    if (!tasks && !isLoading && !error) {
      dispatch(fetchTasks(dayjs(selectedDayDate).format('YYYY-MM')));
      console.log('Chart useEffect to get tasks');
    }
  }, [dispatch, error, isLoading, selectedDayDate, tasks]);

  //if tasks, getTaskTypeDistribution

  if (!tasks) {
    console.log('No tasks');
    return (
      <>
        {isLoading && <ScreenLoader />}
        {error && (
          <Notification icon={xIcon} color="red" title="Bummer!">
            Something went wrong
          </Notification>
        )}
      </>
    );
  }

  const dataForChart = getChartData(tasks, selectedDayDate);

  console.log('render', 'Statistics');
  console.log('tasks', tasks);
  console.log(selectedDayDate);

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
      {error && (
        <Notification icon={xIcon} color="red" title="Bummer!">
          Something went wrong
        </Notification>
      )}

      <Container className={classes.stat__container}>
        <Wrapper>
          <Box className={classes.stat__header}>
            <PeriodPaginator />
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

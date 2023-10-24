import ScreenLoader from '@/components/ScreenLoader';
import {
  Chart,
  ChartTitle,
  ChartWrapper,
  Legend,
  ResponsiveChartWrapper,
  Wrapper,
  StatPeriodPaginator,
} from './components';
import { Box, Container } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTasks } from '@/modules/Calendar/hooks/useTasks';
import { fetchTasks } from '@/modules/Calendar/redux/operations';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getChartData, translateDataItemsNames } from './helpers';
import { useTranslation } from 'react-i18next';
import classes from './styles/Statistics.module.css';

function Statistics() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const types = t('statistics.types', {
    returnObjects: true,
  });
  const { tasks, isLoading, error } = useTasks();
  // const [isTasks, setIsTasks] = useState(true);
  // useSelector((state) => state?.calendar?.currentDate) ?? dayjs();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const currentMonth = dayjs(currentDate).format('YYYY-MM');
  const currentDay = dayjs(currentDate).format('YYYY-MM-DD');
  // const nameOfDate = dayjs(currentDate).format('DD MMMM YYYY');

  // const prevDay = () => {
  //   setCurrentDate(currentDate.subtract(1, 'day'));
  // };

  // const nextDay = () => {
  //   setCurrentDate(currentDate.add(1, 'day'));
  // };

  const dataForChart = translateDataItemsNames(
    getChartData(tasks, currentDay),
    types,
  );

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
            <StatPeriodPaginator
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
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

import PeriodPaginator from '@/components/PeriodPaginator';
import { Chart, ChartTitle, ChartWrapper, Legend, Wrapper } from './components';
import { Box, Container } from '@mantine/core';
import classes from './Statistics.module.css';

function Statistics() {
  return (
    <Container className={classes.stat__container}>
      <Wrapper>
        <Box className={classes.stat__header}>
          <PeriodPaginator />
          <Legend />
        </Box>
        <ChartWrapper>
          <ChartTitle>Tasks</ChartTitle>
          <Chart />
        </ChartWrapper>
      </Wrapper>
    </Container>
  );
}

export default Statistics;

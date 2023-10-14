import PeriodPaginator from '@/components/PeriodPaginator';
import { Chart, ChartWrapper, Legend, Wrapper } from './components';
import { Box, Container } from '@mantine/core';
import classes from './Statistics.module.css';

function Statistics() {
  return (
    <Box bg="#F7F6F9">
      {' '}
      {/* Temp component for develop. Need del */}
      <Container className={classes.stat__container}>
        <Wrapper>
          <Box className={classes.stat__header}>
            <PeriodPaginator />
            <Legend />
          </Box>
          <ChartWrapper>
            <Chart />
          </ChartWrapper>
        </Wrapper>
      </Container>
    </Box>
  );
}

export default Statistics;

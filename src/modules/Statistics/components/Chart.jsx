import { px, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import PropTypes from 'prop-types';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { breakpoints, chartDimensions } from '../helpers';

export function Chart({ data, width }) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const chartColors = {
    light: {
      text: theme.colors.dark[6],
      grid: theme.colors.blue[0],
    },
    dark: {
      text: theme.colors.dark[0],
      grid: theme.colors.gray[2],
    },
  };
  const currentBreakpoint =
    width < px(theme.breakpoints.md)
      ? breakpoints.sm
      : width < px(theme.breakpoints.xl)
      ? breakpoints.md
      : breakpoints.xl;

  const barLabel = {
    position: 'top',
    fontFamily: 'Poppins',
    fontWeight: 500,
    fontSize: chartDimensions[currentBreakpoint].barLabelFontSize,
    fill: chartColors[colorScheme].text,
    formatter: (value) => `${value}%`,
  };

  // console.log('render', 'Chart');
  // console.log('data', data);

  return (
    <>
      <ResponsiveContainer
        width="100%"
        minHeight={chartDimensions[currentBreakpoint].barChartHeight}
      >
        <BarChart
          width="100%"
          height={chartDimensions[currentBreakpoint].barChartHeight}
          data={data}
          margin={chartDimensions[currentBreakpoint].barChartMargin}
          barGap={chartDimensions[currentBreakpoint].barGap}
          barCategoryGap={chartDimensions[currentBreakpoint].barCategoryGap}
          barSize={chartDimensions[currentBreakpoint].barSize}
        >
          <CartesianGrid
            stroke={chartColors[colorScheme].grid}
            vertical={false}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tickMargin={20}
            tick={({ x, y, payload }) => (
              <text
                x={x}
                y={y}
                textAnchor="middle"
                fill={chartColors[colorScheme].text}
                fontFamily="Inter"
                fontSize={chartDimensions[currentBreakpoint].xTickFontSize}
                fontWeight={400}
                style={{
                  lineHeight: '1.33',
                  textTransform: 'capitalize',
                }}
              >
                {payload.value}
              </text>
            )}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={[0, 20, 40, 60, 80, 100]}
            tickMargin={chartDimensions[currentBreakpoint].yTickMargin}
            tick={({ x, y, payload }) => (
              <text
                x={x}
                y={y}
                dy={5}
                textAnchor="end"
                fill={chartColors[colorScheme].text}
                fontFamily="Inter"
                fontSize={14}
                fontWeight={400}
                style={{ lineHeight: 1.5 }}
              >
                {payload.value}
              </text>
            )}
          />
          <defs>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 210, 221, 0)" />
              <stop offset="100%" stopColor="rgba(255, 210, 221, 1)" />
            </linearGradient>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(62, 133, 243, 0)" />
              <stop offset="100%" stopColor="rgba(62, 133, 243, 1)" />
            </linearGradient>
          </defs>
          <Bar
            dataKey="byDay"
            fill="url(#redGradient)"
            label={barLabel}
            radius={[0, 0, 7, 7]}
          />
          <Bar
            dataKey="byMonth"
            fill="url(#blueGradient)"
            label={barLabel}
            radius={[0, 0, 7, 7]}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  width: PropTypes.number,
};

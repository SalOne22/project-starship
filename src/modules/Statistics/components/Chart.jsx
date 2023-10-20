import { px, useMantineTheme } from '@mantine/core';
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

// eslint-disable-next-line react/prop-types
export function Chart({ data, width }) {
  const theme = useMantineTheme();

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
    fill: '#343434',
    formatter: (value) => `${value}%`,
    style: {
      lineHeight: 1.5,
      color: '#343434',
    },
  };

  console.log('render', 'Chart');
  console.log('data', data);
  console.log(width);
  console.log(theme.breakpoints);
  console.log('currentBreakpoint', currentBreakpoint);
  console.log(
    'chartDimensions[currentBreakpoint].responsiveContainerMinHeight',
    chartDimensions[currentBreakpoint].barChartHeight,
  );

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
          <CartesianGrid stroke="#E3F3FF" vertical={false} />
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
                fill="#343434"
                fontFamily="Inter"
                fontSize={chartDimensions[currentBreakpoint].xTickFontSize}
                fontWeight={400}
                style={{
                  color: '#343434',
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
                fill="#343434"
                fontFamily="Inter"
                fontSize={14}
                fontWeight={400}
                style={{ color: '#343434', lineHeight: 1.5 }}
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

Chart.prototype = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  width: PropTypes.number.isRequired,
};

import PropTypes from 'prop-types';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

// eslint-disable-next-line react/prop-types
export function Chart({ data }) {
  console.log('render', 'Chart');
  console.log('data', data);
  return (
    <>
      <ResponsiveContainer width="100%" height="100%" minHeight={300}>
        <BarChart
          width="100%"
          data={data}
          margin={{ top: 18, left: -20 }}
          barGap="11%"
          barCategoryGap="17%"
        >
          <CartesianGrid stroke="#E3F3FF" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tickMargin={24}
            tick={({ x, y, payload }) => (
              <text
                x={x}
                y={y}
                textAnchor="middle"
                fill="#343434"
                fontFamily="Inter"
                fontSize={12}
                fontWeight={400}
                style={{ lineHeight: '1.33', textTransform: 'capitalize' }}
              >
                {payload.value}
              </text>
            )}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={[0, 20, 40, 60, 80, 100]}
            tickMargin={8}
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
            label={{
              position: 'top',
              fontFamily: 'Poppins',
              fontWeight: 500,
              fontSize: 12,
              fill: '#343434',
              formatter: (value) => `${value}%`,
            }}
            radius={[0, 0, 7, 7]}
            maxBarSize={27}
          />
          <Bar
            dataKey="byMonth"
            fill="url(#blueGradient)"
            label={{
              position: 'top',
              fontFamily: 'Poppins',
              fontWeight: 500,
              fontSize: 12,
              fill: '#343434',
              formatter: (value) => `${value}%`,
            }}
            radius={[0, 0, 7, 7]}
            maxBarSize={27}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

Chart.prototype = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

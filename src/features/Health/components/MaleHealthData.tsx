import { CustomToolTip } from '@shared/components/CustomToolTip';
import { Typography } from '@mui/material';
import { theme } from '@shared/styles/theme';
import type {
  ChartDataProps,
  HealthChartDataByCountryProps,
  HealthDataByCountryProps,
  PerformancePopulationGrowthChartData,
} from '@shared/types/common';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function MaleHealthByCountryChart({ data }: HealthChartDataByCountryProps) {
  return (
    <>
      <Typography variant="h4" margin={theme.padding}>
        Population per working age group
      </Typography>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          //   width={500}
          //   height={400}
          data={data.maleHealthData}
          //   stackOffset="sign"
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
          }}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* <CartesianGrid stroke="#f5f5f5" /> */}
          <XAxis
            dataKey="year"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip content={CustomToolTip} />
          <Legend />
          <Bar
            dataKey="value"
            background={{ fill: '#eee' }}
            fill="#c0603d"
            name={`${data.maleHealthData[0].indicator} per year`}
          />
          {/* <Line type="monotone" dataKey="d2Value" stroke="#c0603d" /> */}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default MaleHealthByCountryChart;

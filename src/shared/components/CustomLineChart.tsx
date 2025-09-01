import { CustomToolTip } from '@shared/components/CustomToolTip';
import { Typography } from '@mui/material';
import { theme } from '@shared/styles/theme';
import type {
  ChartDataProps,
  DataProps,
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
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function CustomLineChart({
  title,
  data,
  xAxisLabelName,
  colorFill,
  xAxisDataKey,
}: {
  title: string;
  data: DataProps;
  xAxisLabelName: string;
  colorFill: string;
  xAxisDataKey?: string;
}) {
  return (
    <>
      <Typography variant="h4" margin={theme.padding}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          //   width={500}
          //   height={400}
          data={data}
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
            dataKey={xAxisDataKey ? xAxisDataKey : 'year'}
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip content={CustomToolTip} />
          <Legend />
          {/* <Line
            dataKey="value"
            // background={{ fill: '#eee' }}
            fill="#c0603d"
            name={`${data.femaleHealthData[0].indicator} per year`}
          /> */}
          <Line
            type="monotone"
            dataKey="value"
            stroke={colorFill}
            activeDot={{ r: 8 }}
            name={`${xAxisLabelName} per year`}
          />
          {/* <Line type="monotone" dataKey="d2Value" stroke="#c0603d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default CustomLineChart;

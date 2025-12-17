import { CustomToolTip } from '@shared/components/CustomToolTip';
import { Typography } from '@mui/material';
import { theme } from '@shared/styles/theme';
import type { DataProps } from '@shared/types/common';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
function CustomBarChart({
  data,
  xAxisLabelName,
  title,
  colorFill,
  xAxisDataKey,
}: {
  data: DataProps;
  xAxisLabelName: string;
  title: string;
  colorFill: string;
  xAxisDataKey: string;
}) {
  return (
    <>
      <Typography variant="h4" margin={theme.padding}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisDataKey ? xAxisDataKey : 'year'} />
          <YAxis />
          <Tooltip content={CustomToolTip} />
          <Legend />
          <Bar
            dataKey="value"
            fill={colorFill}
            name={xAxisLabelName}
            // activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default CustomBarChart;

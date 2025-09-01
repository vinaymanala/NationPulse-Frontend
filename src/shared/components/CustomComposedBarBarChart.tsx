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
import { CustomToolTip } from '@shared/components/CustomToolTip';
import type { DataProps } from '@shared/types/common';
import { Typography } from '@mui/material';
import { theme } from '@shared/styles/theme';

function CustomComposedBarBarChart({
  data,
  xAxisLabelName1,
  xAxisLabelName2,
  title,
  colorFill,
}: {
  data: DataProps;
  xAxisLabelName1: string;
  xAxisLabelName2: string;
  title: string;
  colorFill: string;
}) {
  return (
    <>
      <Typography variant="h4" margin={theme.padding}>
        {title}
      </Typography>
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <BarChart
          // width={500}
          // height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip content={CustomToolTip} />
          <Legend />
          <Bar
            dataKey="value1"
            stackId="a"
            fill="#0D47A1"
            name={xAxisLabelName1}
          />
          <Bar
            dataKey="value2"
            stackId="a"
            fill={colorFill}
            name={xAxisLabelName2}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default CustomComposedBarBarChart;

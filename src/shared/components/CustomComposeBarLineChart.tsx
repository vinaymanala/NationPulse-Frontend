import {
  Bar,
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

function CustomComposedBarLineChart({
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
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
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
            dataKey="value2"
            barSize={20}
            fill={colorFill}
            name={xAxisLabelName2}
          />
          <Line
            type="monotone"
            dataKey="value1"
            activeDot={true}
            stroke="#0D47A1"
            name={xAxisLabelName1}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
}

export default CustomComposedBarLineChart;

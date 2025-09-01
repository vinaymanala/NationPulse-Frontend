import CustomLineChart from '@shared/components/CustomLineChart';
import type { ChartDataProps, DataProps } from '@shared/types/common';

function HealthChart({ data }: ChartDataProps) {
  return (
    <CustomLineChart
      title="Health"
      data={data as DataProps}
      xAxisLabelName={data[0].indicator as string}
      xAxisDataKey={'name'}
      colorFill={'#c0603d'}
    />
  );
}

export default HealthChart;

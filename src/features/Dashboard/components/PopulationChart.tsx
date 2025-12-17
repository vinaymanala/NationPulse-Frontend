import CustomBarChart from '@shared/components/CustomBarChart';
import type { ChartDataProps, DataProps } from '@shared/types/common';

function PopulationChart({ data }: ChartDataProps) {
  return (
    <CustomBarChart
      title="Population"
      data={data as DataProps}
      xAxisLabelName={data[0]?.indicator as string}
      colorFill={'#c0603d'}
      xAxisDataKey="shortName"
    />
  );
}

export default PopulationChart;

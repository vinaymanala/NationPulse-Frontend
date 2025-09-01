import CustomLineChart from '@shared/components/CustomLineChart';
import type { ChartDataProps, DataProps } from '@shared/types/common';

function GdpPerCapitaChart({ data }: ChartDataProps) {
  return (
    <CustomLineChart
      title=" GDP per capita"
      data={data as DataProps}
      xAxisLabelName={data[0].indicator as string}
      xAxisDataKey="name"
      colorFill={'#c0603d'}
    />
  );
}

export default GdpPerCapitaChart;

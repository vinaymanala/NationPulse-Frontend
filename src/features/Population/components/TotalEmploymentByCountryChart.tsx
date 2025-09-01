import type { PerformancePopulationGrowthChartData } from '@shared/types/common';
import CustomBarChart from '@shared/components/CustomBarChart';

function TotalEmploymentByCountryChart({
  data,
}: PerformancePopulationGrowthChartData) {
  return (
    <CustomBarChart
      title="Total Employment Growth"
      data={data.totalEmploymentGrowth}
      xAxisLabelName={`${data.totalEmploymentGrowth[0].indicator} per year`}
      colorFill="#6D9DC5"
    />
  );
}

export default TotalEmploymentByCountryChart;

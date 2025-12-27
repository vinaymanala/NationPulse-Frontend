import type { PerformancePopulationGrowthChartData } from '@shared/types/common';
import CustomLineChart from '@shared/components/CustomLineChart';

function TotalWorkingPopulationByCountryChart({
  data,
}: PerformancePopulationGrowthChartData) {
  return data.workingPopulationGrowth.length ? (
    <CustomLineChart
      title="Working age group population growth"
      data={data.workingPopulationGrowth}
      xAxisLabelName={`${data.workingPopulationGrowth[0].indicator}`}
      colorFill="#6D9DC5"
    />
  ) : null;
}

export default TotalWorkingPopulationByCountryChart;

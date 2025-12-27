import type { PerformancePopulationGrowthChartData } from '@shared/types/common';
import CustomLineChart from '@shared/components/CustomLineChart';

function EmploymentRateTrendByCountryChart({
  data,
}: PerformancePopulationGrowthChartData) {
  return data.employmentRateTrendGrowth.length ? (
    <CustomLineChart
      title="Employment Trend Growth"
      data={data.employmentRateTrendGrowth}
      xAxisLabelName={`${data.employmentRateTrendGrowth[0].indicator}`}
      colorFill="#6D9DC5"
    />
  ) : null;
}

export default EmploymentRateTrendByCountryChart;

import type { PerformancePopulationGrowthChartData } from '@shared/types/common';

import CustomBarChart from '@shared/components/CustomBarChart';

function TotalUnEmploymentByCountryChart({
  data,
}: PerformancePopulationGrowthChartData) {
  return data.unemploymentGrowth.length ? (
    <CustomBarChart
      title="Total Unemployment Growth"
      data={data.unemploymentGrowth}
      xAxisLabelName={`${data.unemploymentGrowth[0].indicator} per year`}
      colorFill="#6D9DC5"
      xAxisDataKey="year"
    />
  ) : null;
}

export default TotalUnEmploymentByCountryChart;

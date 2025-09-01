import type { PerformancePopulationGrowthChartData } from '@shared/types/common';

import CustomBarChart from '@shared/components/CustomBarChart';

function TotalUnEmploymentByCountryChart({
  data,
}: PerformancePopulationGrowthChartData) {
  return (
    <CustomBarChart
      title="Total Unemployment Growth"
      data={data.unemploymentGrowth}
      xAxisLabelName={`${data.unemploymentGrowth[0].indicator} per year`}
      colorFill="#6D9DC5"
    />
  );
}

export default TotalUnEmploymentByCountryChart;

import type { PerformancePopulationGrowthChartData } from '@shared/types/common';

import CustomLineChart from '@shared/components/CustomLineChart';

function TotalPopulationByCountryChart({
  data,
}: PerformancePopulationGrowthChartData) {
  //   const TotalPopulationAndWorkingPopulationData =
  //     data.totalPopulationGrowth.map((d1) => {
  //       const matchingd2 = data.totalEmploymentGrowth.find(
  //         (x) => x.year === d1.year
  //       );
  //       return {
  //         [`d1Name`]: d1.name,
  //         [`d1ShortName`]: d1.shortName,
  //         [`d1Year`]: d1.year,
  //         [`d1Value`]: d1.value,
  //         [`d1Indicator`]: d1.indicator,
  //         [`d1Info`]: d1.info,
  //         [`d1TooltipValue`]: d1.tooltipValue,
  //         [`d2Name`]: matchingd2?.name,
  //         [`d2ShortName`]: matchingd2?.shortName,
  //         [`d2Year`]: matchingd2?.year,
  //         [`d2Value`]: matchingd2?.value,
  //         [`d2Indicator`]: matchingd2?.indicator,
  //         [`d2Info`]: matchingd2?.info,
  //         [`d2TooltipValue`]: matchingd2?.tooltipValue,
  //       };
  //     });
  return (
    <CustomLineChart
      title="Total Population Growth"
      data={data.totalPopulationGrowth}
      xAxisLabelName={`${data.totalPopulationGrowth[0].indicator}`}
      colorFill="#6D9DC5"
    />
  );
}

export default TotalPopulationByCountryChart;

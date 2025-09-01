export type TitleCardProps = {
  title: string;
  description?: string;
};

export type SectionContainerProps = {
  title: string;
  children: React.ReactNode;
};

export type ChartDataProps = {
  data: {
    [k: string]: string | number | null | [];
  }[];
};

export type DataProps = {
  [k: string]: string | number | null;
}[];

export type PopulationByCountryProps = {
  name: string;
  shortName: string;
  indicator: string;
  indicatorCode: string;
  unitRange?: string;
  year: number;
  value: number | null;
  info: string;
}[];

export type PerformancePopulationDataByCountryProps = {
  totalPopulationGrowth: DataProps;
  totalEmploymentGrowth: DataProps;
  workingPopulationGrowth: DataProps;
  employmentRateTrendGrowth: DataProps;
  unemploymentGrowth: DataProps;
};

export type PerformancePopulationGrowthChartData = {
  data: PerformancePopulationDataByCountryProps;
};

export type HealthDataByCountryProps = {
  name: string;
  shortName: string;
  indicator: string;
  indicatorCode: string;
  sexName: string;
  sexCode: string;
  cause: string;
  unitRange: string;
  year: number;
  value: number | null;
  info: string;
}[];

export type HealthDataFormattedByCountryProps = {
  maleHealthData: HealthDataByCountryProps;
  femaleHealthData: HealthDataByCountryProps;
  totalHealthData: HealthDataByCountryProps;
};

export type HealthChartDataByCountryProps = {
  data: HealthDataFormattedByCountryProps;
};

export type EconomyDataByCountryProps = {
  name: string;
  shortName: string;
  indicator: string;
  indicatorCode: string;
  year: number;
  value: number | null;
  info: string;
}[];

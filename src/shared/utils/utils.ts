import type {
  PopulationResponseSchema,
  HealthResponseSchema,
  GDPPerCapitaResponseSchema,
  PerformancePopulationDataByCountrySchema,
  HealthDataByCountrySchema,
  GovernmentDataByCountrySchema,
  GdpPerCapitaDataByCountrySchema,
  PermissionsSchema,
  UserRefreshTokenSchema,
} from '@shared/types/api';
import type {
  DataProps,
  HealthDataByCountryProps,
  HealthDataFormattedByCountryProps,
  PopulationByCountryProps,
} from '@shared/types/common';
import type z from 'zod';

export const formattedRefreshTokenData = (
  data: z.infer<typeof UserRefreshTokenSchema>
) => {
  if (!data) return [];
  const resp = {
    data: {
      access_token: data.data.access_token,
    },
  };
};

export const formattedPermissionsData = (
  data: z.infer<typeof PermissionsSchema>
) => {
  if (!data) return [];
  return data.data;
};

export const formattedPopulationData = (
  data: z.infer<typeof PopulationResponseSchema>
) => {
  if (!data) return [];
  console.log('response', data);
  return data.data
    .map((item) => ({
      name: item.country_name,
      shortName: item.country_code,
      indicator: item.indicator,
      indicator_code: item.indicator_code,
      value: item.value,
      year: item.year,
      info: `Population in ${item.year}`,
      tooltipValue: item.value && `${(item.value / 1e9).toLocaleString()}bn`,
    }))
    .sort((a, b) => a.year - b.year);
};

export const formattedHealthData = (
  data: z.infer<typeof HealthResponseSchema>
) => {
  if (!data) return [];
  return data.data
    .map((item) => ({
      name: item.country_name,
      shortName: item.country_code,
      indicator: item.indicator,
      indicator_code: item.indicator_code,
      value: item.value,
      info: `${item.cause} : ${item.unitRange}`,
      year: item.year,
      tooltipValue: item.value && `${item.value.toLocaleString()}`,
    }))
    .sort((a, b) => a.year - b.year);
};

export const formattedGdpPerCapitaData = (
  data: z.infer<typeof GDPPerCapitaResponseSchema>
) => {
  if (!data) return [];
  console.log('DataGDP', data);
  return data.data.map((item) => ({
    name: item.country_name,
    shortName: item.country_code,
    indicator: item.indicator,
    indicator_code: item.indicator_code,
    value: item.value,
    year: item.year,
    info: `Estimated as of (${item.year})`,
    tooltipValue: item.value && `${item.value.toLocaleString()}`,
  }));
};

export const formattedPerformancePopulationData = (
  data: z.infer<typeof PerformancePopulationDataByCountrySchema>
) => {
  if (!data) return [];
  const totalPopulationGrowth: PopulationByCountryProps = [];
  const workingPopulationGrowth: PopulationByCountryProps = [];
  const totalEmploymentGrowth: PopulationByCountryProps = [];
  const unemploymentGrowth: PopulationByCountryProps = [];
  const employmentRateTrendGrowth: PopulationByCountryProps = [];
  data.data.map((item) => {
    if (item.indicator_code === 'POP') {
      totalPopulationGrowth.push({
        name: item.country_name,
        shortName: item.country_code,
        indicatorCode: item.indicator_code,
        indicator: item.indicator,
        value: item.value,
        year: Number(item.year),
        info: `Estimated growth as of (${item.year})`,
      });
    } else if (item.indicator_code == 'POP1574') {
      workingPopulationGrowth.push({
        name: item.country_name,
        shortName: item.country_code,
        indicatorCode: item.indicator_code,
        indicator: item.indicator,
        value: item.value,
        year: Number(item.year),
        info: `Estimated growth as of (${item.year})`,
      });
    } else if (item.indicator_code === 'ET_ANNPCT') {
      totalEmploymentGrowth.push({
        name: item.country_name,
        shortName: item.country_code,
        indicatorCode: item.indicator_code,
        indicator: item.indicator,
        value: item.value,
        year: Number(item.year),
        info: `Estimated growth as of (${item.year})`,
      });
    } else if (item.indicator_code === 'UNR') {
      unemploymentGrowth.push({
        name: item.country_name,
        shortName: item.country_code,
        indicatorCode: item.indicator_code,
        indicator: item.indicator,
        value: item.value,
        year: Number(item.year),
        info: `Estimated growth as of (${item.year})`,
      });
    } else if (item.indicator_code === 'ERS1574') {
      employmentRateTrendGrowth.push({
        name: item.country_name,
        shortName: item.country_code,
        indicatorCode: item.indicator_code,
        indicator: item.indicator,
        value: item.value,
        year: Number(item.year),
        info: `Estimated growth as of (${item.year})`,
      });
    }
  });

  const result = {
    totalPopulationGrowth: totalPopulationGrowth.sort(
      (a, b) => a.year - b.year
    ),
    totalEmploymentGrowth: totalEmploymentGrowth.sort(
      (a, b) => a.year - b.year
    ),
    workingPopulationGrowth: workingPopulationGrowth.sort(
      (a, b) => a.year - b.year
    ),
    employmentRateTrendGrowth: employmentRateTrendGrowth.sort(
      (a, b) => a.year - b.year
    ),
    unemploymentGrowth: unemploymentGrowth.sort((a, b) => a.year - b.year),
  };
  return result;
};

export const formatHealthDataByCountry = (
  data: z.infer<typeof HealthDataByCountrySchema>
): HealthDataFormattedByCountryProps => {
  const femaleHealthData: HealthDataByCountryProps = [];
  const maleHealthData: HealthDataByCountryProps = [];
  // const LifeExpectancyHealthData = []
  const totalHealthData: HealthDataByCountryProps = [];
  const result = { maleHealthData, femaleHealthData, totalHealthData };
  if (!data) return result;

  data.data.map((item) => {
    switch (item.sexCode) {
      case 'F':
        femaleHealthData.push({
          name: item.countryName,
          shortName: item.countryCode,
          indicatorCode: item.indicatorCode,
          indicator: item.indicator,
          sexName: item.sexName,
          sexCode: item.sexCode,
          cause: item.cause,
          unitRange: item.unitRange,
          value: item.value,
          year: item.year,
          info: `Estimated growth as of (${item.year})`,
        });
        break;
      case 'M':
        maleHealthData.push({
          name: item.countryName,
          shortName: item.countryCode,
          indicatorCode: item.indicatorCode,
          indicator: item.indicator,
          sexName: item.sexName,
          sexCode: item.sexCode,
          cause: item.cause,
          unitRange: item.unitRange,
          value: item.value,
          year: item.year,
          info: `Estimated growth as of (${item.year})`,
        });
        break;
      case '_T':
        totalHealthData.push({
          name: item.countryName,
          shortName: item.countryCode,
          indicatorCode: item.indicatorCode,
          indicator: item.indicator,
          sexName: item.sexName,
          sexCode: item.sexCode,
          cause: item.cause,
          unitRange: item.unitRange,
          value: item.value,
          year: item.year,
          info: `Estimated growth as of (${item.year})`,
        });
    }
  });
  return {
    femaleHealthData: result.femaleHealthData.sort((a, b) => a.year - b.year),
    maleHealthData: result.maleHealthData.sort((a, b) => a.year - b.year),
    totalHealthData: result.totalHealthData.sort((a, b) => a.year - b.year),
  };
};

export const formattedEconomyDataByCountry = (
  data: z.infer<typeof GovernmentDataByCountrySchema>
) => {
  if (!data) return [];
  const result = data.data
    .map((item) => ({
      name: item.countryName,
      shortName: item.countryName,
      indicator: item.indicator,
      indicatorCode: item.indicatorCode,
      year: item.year,
      value: item.value,
      info: `Estimated growth as of (${item.year})`,
    }))
    .sort((a, b) => a.year - b.year);
  console.log(result);
  return result;
};

export const formattedGdpPerCapitaDataByCountry = (
  data: z.infer<typeof GdpPerCapitaDataByCountrySchema>
) => {
  if (!data) return [];
  return data.data
    .map((item) => ({
      name: item.countryName,
      shortName: item.countryName,
      indicator: item.indicator,
      indicatorCode: item.indicatorCode,
      year: item.year,
      value: item.value,
      info: `Estimated growth as of (${item.year})`,
    }))
    .sort((a, b) => a.year - b.year);
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.substring(1);
};

export function getFilteredData<T>(
  data: DataProps,
  target: string,
  item: string
): T {
  return data.filter((x) => x[target] === item) as T;
}

export function getCombineData<T extends any[]>(
  data1: T,
  data2: T,
  label: string,
  unitKey1: string,
  unitKey2: string
) {
  const result = data1.map((r) => {
    const m = data2.find((e) => e.year === r.year);
    return {
      name: r.name,
      shortName: r.shortName,
      indicator: label,
      indicatorCode: r.indicatorCode,
      indicator1: r.indicator,
      indicator2: m?.indicator as string,
      indicatorCode1: r.indicatorCode,
      indicatorCode2: m?.indicatorCode as string,
      value1: r.value,
      value2: m?.value as number,
      year: r.year,
      info: `Estimated growth as of (${r.year})`,
      unitKey1,
      unitKey2,
      // info: `${r.info}`,
    };
  }) as T;
  return result;
}

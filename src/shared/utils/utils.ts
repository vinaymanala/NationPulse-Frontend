import { useAuth } from '@app/context';
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
  CountriesSchema,
} from '@shared/types/api';
import type {
  AuthContextType,
  DataProps,
  HealthDataByCountryProps,
  HealthDataFormattedByCountryProps,
  PopulationByCountryProps,
} from '@shared/types/common';
import type z from 'zod';

const getFormattedData = (date: string) => {
  return new Date(date).toUTCString();
};
export const formattedCountriesData = (
  data: z.infer<typeof CountriesSchema>
) => {
  if (!data) return [];
  return data.data;
};

export const formattedRefreshTokenData = (
  data: z.infer<typeof UserRefreshTokenSchema>
) => {
  if (!data) return [];
  const resp = {
    data: {
      access_token: data.data.access_token,
    },
  };
  return resp;
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
  return data.data
    .map((item) => ({
      name: item.country_name,
      shortName: item.country_code,
      indicator: item.indicator,
      indicatorCode: item.indicator_code,
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
      indicatorCode: item.indicator_code,
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
  return data.data.map((item) => ({
    name: item.country_name,
    shortName: item.country_code,
    indicator: item.indicator,
    indicatorCode: item.indicator_code,
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
        last_updated: getFormattedData(item.last_updated),
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
        last_updated: getFormattedData(item.last_updated),
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
        last_updated: getFormattedData(item.last_updated),
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
        last_updated: getFormattedData(item.last_updated),
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
        last_updated: getFormattedData(item.last_updated),
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
    switch (item.sex_code) {
      case 'F':
        femaleHealthData.push({
          name: item.country_name,
          shortName: item.country_code,
          indicatorCode: item.indicator_code,
          indicator: item.indicator,
          sexName: item.sex_name,
          sexCode: item.sex_code,
          cause: item.cause,
          unitRange: item.unitRange,
          value: item.value,
          year: item.year,
          info: `Estimated growth as of (${item.year})`,
          last_updated: getFormattedData(item.last_updated),
        });
        break;
      case 'M':
        maleHealthData.push({
          name: item.country_name,
          shortName: item.country_code,
          indicatorCode: item.indicator_code,
          indicator: item.indicator,
          sexName: item.sex_name,
          sexCode: item.sex_code,
          cause: item.cause,
          unitRange: item.unitRange,
          value: item.value,
          year: item.year,
          info: `Estimated growth as of (${item.year})`,
          last_updated: getFormattedData(item.last_updated),
        });
        break;
      case '_T':
        totalHealthData.push({
          name: item.country_name,
          shortName: item.country_code,
          indicatorCode: item.indicator_code,
          indicator: item.indicator,
          sexName: item.sex_name,
          sexCode: item.sex_code,
          cause: item.cause,
          unitRange: item.unitRange,
          value: item.value,
          year: item.year,
          info: `Estimated growth as of (${item.year})`,
          last_updated: getFormattedData(item.last_updated),
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
      name: item.country_name,
      shortName: item.country_name,
      indicator: item.indicator,
      indicatorCode: item.indicator_code,
      year: Number(item.year),
      value: item.value,
      info: `Estimated growth as of (${item.year})`,
      last_updated: getFormattedData(item.last_updated),
    }))
    .sort((a, b) => a.year - b.year);
  return result;
};

export const formattedGdpPerCapitaDataByCountry = (
  data: z.infer<typeof GdpPerCapitaDataByCountrySchema>
) => {
  if (!data) return [];
  return data.data
    .map((item) => ({
      name: item.country_name,
      shortName: item.country_name,
      indicator: item.indicator,
      indicatorCode: item.indicator_code,
      year: Number(item.year),
      value: item.value,
      info: `Estimated growth as of (${item.year})`,
      last_updated: getFormattedData(item.last_updated),
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

export const subscribeReportEvent = (auth: AuthContextType): EventSource => {
  const event = new EventSource(
    'http://localhost:8081/api/uu/reports/subscribe/event',
    {
      withCredentials: true,
    }
  );

  event.onopen = () => {
    console.log('SSE Connection opened successfully');
  };

  event.onerror = () => {
    auth.setOpenReportStatus({
      type: 'error',
      message: 'Report generation failed. Kindly try again in some time.',
      open: true,
    });
    event.close();
  };

  event.addEventListener('export-status', (e) => {
    const rawData = e.data.trim();

    // Parse the JSON string
    let data;
    try {
      data = JSON.parse(rawData);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return;
    }

    const csvData = atob(data.Data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `export.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (data.StatusCode == 1) {
      auth.setOpenReportStatus({
        type: 'success',
        message:
          'Your report generated successully. Kindly check in your downloads',
        open: true,
      });
      // console.log({ data });
      event.close(); // Close after receiving success
    }
  });

  return event;
};

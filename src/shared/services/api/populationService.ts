import type z from 'zod';
import { apiClient } from './client';

const endpointPopulationPrefix = '/population/v1/api';
const endpointPerfPopulationPrefix = '/performancegrowth/v1/api';

export const populationService = {
  getPopulationDataByCountry: async function <T extends z.ZodSchema>(
    countryCode: string,
    schema: T
  ): Promise<z.output<T>> {
    const response = await apiClient.get(
      `${endpointPopulationPrefix}/country/${countryCode}`
    );
    return schema.parse(response.data);
  },

  getPopulationPerformanceGrowthByCountry: async function <
    T extends z.ZodSchema,
  >(countryCode: string, schema: T): Promise<z.output<T>> {
    const response = await apiClient.get(
      `${endpointPerfPopulationPrefix}/population/${countryCode}`
    );
    return schema.parse(response.data);
  },
};

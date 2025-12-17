import type z from 'zod';
import { apiClient } from './client';

const endpointPopulationPrefix = '/api/population';
const endpointPerfPopulationPrefix = '/api/growth';

export const populationService = {
  getPopulationDataByCountry: async function <T extends z.ZodSchema>(
    countryCode: string,
    schema: T
  ): Promise<z.output<T>> {
    const response = await apiClient.get(
      `${endpointPopulationPrefix}/country?countryCode=${countryCode}`
    );
    return schema.parse(response.data);
  },

  getPopulationPerformanceGrowthByCountry: async function <
    T extends z.ZodSchema,
  >(countryCode: string, schema: T): Promise<z.output<T>> {
    const response = await apiClient.get(
      `${endpointPerfPopulationPrefix}/population/country?countryCode=${countryCode}`
    );
    return schema.parse(response.data);
  },
};

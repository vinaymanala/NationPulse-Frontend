import type z from 'zod';
import { apiClient } from './client';

const endpointHealthPrefix = '/health/v1/api';
// const endpointPerfPopulationPrefix = '/performancegrowth/v1/api';

export const healthService = {
  getHealthDataByCountry: async function <T extends z.ZodSchema>(
    countryCode: string,
    schema: T
  ): Promise<z.output<T>> {
    const response = await apiClient.get(
      `${endpointHealthPrefix}/country/${countryCode}`
    );
    return schema.parse(response.data);
  },
};

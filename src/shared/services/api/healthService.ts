import type z from 'zod';
import { apiClient } from './client';

const endpointHealthPrefix = '/api/health';
// const endpointPerfPopulationPrefix = '/performancegrowth/v1/api';

export const healthService = {
  getHealthDataByCountry: async function <T extends z.ZodSchema>(
    countryCode: string,
    schema: T
  ): Promise<z.output<T>> {
    const response = await apiClient.get(
      `${endpointHealthPrefix}/country?countryCode=${countryCode}`
    );
    return schema.parse(response.data);
  },
};

import type z from 'zod';
import { apiClient } from './client';

const endpointEconomyPrefix = '/economy/v1/api';
const endpointPerfGDPPrefix = '/performancegrowth/v1/api';

export const economyService = {
  getGovernmentDataByCountry: async function <T extends z.ZodSchema>(
    countryCode: string,
    schema: T
  ): Promise<z.output<T>> {
    const response = await apiClient.get(
      `${endpointEconomyPrefix}/governmentdata/country/${countryCode}`
    );
    return schema.parse(response.data);
  },
  getGdpPerCapitaDataByCountry: async function <T extends z.ZodSchema>(
    countryCode: string,
    schema: T
  ): Promise<z.output<T>> {
    const response = await apiClient.get(
      `${endpointPerfGDPPrefix}/gdp/${countryCode}`
    );
    return schema.parse(response.data);
  },
};

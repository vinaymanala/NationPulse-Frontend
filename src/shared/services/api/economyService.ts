import type z from 'zod';
import { apiClient } from './client';

const endpointEconomyPrefix = '/api/economy';
const endpointPerfGDPPrefix = '/api/growth';

export const economyService = {
  getGovernmentDataByCountry: async function <T extends z.ZodSchema>(
    countryCode: string,
    schema: T
  ): Promise<z.output<T>> {
    const response = await apiClient.get(
      `${endpointEconomyPrefix}/governmentdata/country?countryCode=${countryCode}`
    );
    return schema.parse(response.data);
  },
  getGdpPerCapitaDataByCountry: async function <T extends z.ZodSchema>(
    countryCode: string,
    schema: T
  ): Promise<z.output<T>> {
    const response = await apiClient.get(
      `${endpointPerfGDPPrefix}/gdp/country?countryCode=${countryCode}`
    );
    return schema.parse(response.data);
  },
};

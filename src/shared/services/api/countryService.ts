import type z from 'zod';
import { apiClient } from './client';

export const countryService = {
  getAllCountries: async function <T extends z.ZodSchema>(
    schema: T
  ): Promise<z.output<T>> {
    const response = await apiClient.get(
      `https://www.ipqualityscore.com/api/json/country/list`
    );
    console.log(response.data);
    return schema.parse(response.data);
  },
};

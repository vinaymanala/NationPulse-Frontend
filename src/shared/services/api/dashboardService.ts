import type z from 'zod';
import { apiClient } from './client';

const endpointPrefix = '/api/dashboard';
export const dashboardService = {
  getPopulation: async function <T extends z.ZodSchema>(
    schema: T
  ): Promise<z.output<T>> {
    const response = await apiClient.get(`${endpointPrefix}/population`);
    // console.log(response.data);
    return schema.parse(response.data);
  },

  getHealth: async function <T extends z.ZodSchema>(
    schema: T
  ): Promise<z.output<T>> {
    const response = await apiClient.get(`${endpointPrefix}/health`);
    return schema.parse(response.data);
  },

  getGDPPerCapita: async function <T extends z.ZodSchema>(
    schema: T
  ): Promise<z.output<T>> {
    const response = await apiClient.get(`${endpointPrefix}/gdp`);
    return schema.parse(response.data);
  },
};

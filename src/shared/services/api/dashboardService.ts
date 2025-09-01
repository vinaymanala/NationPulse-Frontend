import type z from 'zod';
import { apiClient } from './client';

const endpointPrefix = '/dashboard/v1/api';
export const dashboardService = {
  getPopulation: async function <T extends z.ZodSchema>(
    schema: T
  ): Promise<z.output<T>> {
    const response = await apiClient.get(`${endpointPrefix}/population/10`);
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
    const response = await apiClient.get(`${endpointPrefix}/gdppercapita`);
    return schema.parse(response.data);
  },
};

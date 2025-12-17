import type z from 'zod';
import { apiClient } from './client';

const endPointPrefix = '/api/uu';

export const utilService = {
  getUserPermissions: async function <T extends z.ZodSchema>(
    schema: T
  ): Promise<z.output<T>> {
    const response = await apiClient.get(`${endPointPrefix}/permissions`);
    return schema.parse(response.data);
  },
};

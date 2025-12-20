import type z from 'zod';
import { apiClient } from './client';

const endPointPrefix = '/api/uu';

export const utilService = {
  getUserPermissions: async function <T extends z.ZodSchema>(
    userID: string | null,
    schema: T
  ): Promise<z.output<T>> {
    const response = await apiClient.post(`${endPointPrefix}/permissions`, {
      userID,
    });
    return schema.parse(response.data);
  },
};

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
    // Defensive: log response shape to help debugging invalid schema errors
    try {
      console.log('RESPONSE', response.data);
      return schema.parse(response.data);
    } catch (e) {
      console.error('Failed to parse permissions response', {
        url: `${endPointPrefix}/permissions`,
        responseData: response.data,
        error: e,
      });
      throw e;
    }
  },
};

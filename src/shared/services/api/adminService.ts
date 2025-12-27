import type z from 'zod';
import { apiClient } from './client';
import type { TUserPermissionsPayload } from '@shared/types/common';

const endPointPrefix = '/api/a';

export const adminService = {
  getUserPermissions: async function <T extends z.ZodSchema>(
    userID: string,
    schema: T
  ): Promise<z.output<T>> {
    try {
      const response = await apiClient.post(
        `${endPointPrefix}/getUserPermissions`,
        {
          userID,
        }
      );
      return schema.parse(response.data);
    } catch (error) {
      console.error('Failed to fetch user permissions', error);
      throw error;
    }
  },
  setUserPermissions: async function <T extends z.ZodSchema>(
    userPermisssions: TUserPermissionsPayload,
    schema: T
  ): Promise<z.output<T>> {
    try {
      const response = await apiClient.post(
        `${endPointPrefix}/setUserPermissions`,
        {
          ...userPermisssions,
        }
      );
      return schema.parse(response.data);
    } catch (error) {
      console.error('Failed to update user permissions', error);
      throw error;
    }
  },

  getUsers: async function <T extends z.ZodSchema>(
    schema: T
  ): Promise<z.output<T>> {
    try {
      const response = await apiClient.get(`${endPointPrefix}/getUsers`);
      return schema.parse(response.data);
    } catch (error) {
      console.error('Failed to fetch all users', error);
      throw error;
    }
  },
};

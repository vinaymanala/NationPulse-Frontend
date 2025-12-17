import type z from 'zod';
import { apiClient } from './client';
import type { TUserFormInput } from '@shared/types/common';

const endPointPrefix = '/api/u';

export const userService = {
  postUserSignin: async function <T extends z.ZodSchema>(
    userDetails: TUserFormInput,
    schema: T
  ): Promise<z.output<T>> {
    console.log(userDetails);
    const response = await apiClient.post(
      `${endPointPrefix}/signin`,
      userDetails
    );
    console.log(response.data);
    return schema.parse(response.data);
  },

  getUserSignOut: async function <T extends z.ZodSchema>(
    schema: T
  ): Promise<z.output<T>> {
    const response = await apiClient.get(`${endPointPrefix}/signout`);
    return schema.parse(response.data);
  },
};

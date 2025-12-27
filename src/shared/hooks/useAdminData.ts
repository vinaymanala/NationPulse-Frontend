import { adminService } from '@shared/services/api/adminService';
import { PermissionsSchema, UsersSchema } from '@shared/types/api';
import type { TUserPermissionsPayload } from '@shared/types/common';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetUserPermissions = () => {
  return useMutation({
    mutationKey: ['admin', 'get', 'permissions'],
    mutationFn: async (userID: string) => {
      return adminService.getUserPermissions(userID, PermissionsSchema);
    },
  });
};
export const useSetUserPermissions = () => {
  return useMutation({
    mutationKey: ['admin', 'set', 'permissions'],
    mutationFn: async (userPermissions: TUserPermissionsPayload) => {
      return adminService.setUserPermissions(
        userPermissions,
        PermissionsSchema
      );
    },
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      return adminService.getUsers(UsersSchema);
    },
  });
};

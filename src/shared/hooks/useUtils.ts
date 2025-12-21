import { utilService } from '@shared/services/api/utilService';
import { PermissionsSchema } from '@shared/types/api';
import { useMutation, useQuery } from '@tanstack/react-query';

export const usePermissions = () => {
  return useMutation({
    mutationKey: ['utils'],
    mutationFn: async (userID: string) => {
      return utilService.getUserPermissions(userID, PermissionsSchema);
    },
  });
};

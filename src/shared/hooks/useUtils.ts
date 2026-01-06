import { utilService } from '@shared/services/api/utilService';
import { PermissionsSchema, PublishReportSchema } from '@shared/types/api';
import { useMutation } from '@tanstack/react-query';

export const usePermissions = () => {
  return useMutation({
    mutationKey: ['utils', 'get', 'permissions'],
    mutationFn: async (userID: string) => {
      return utilService.getUserPermissions(userID, PermissionsSchema);
    },
  });
};

export const usePublishReport = () => {
  return useMutation({
    mutationKey: ['utils', 'publish', 'report'],
    mutationFn: async (data: any) => {
      return utilService.publishReport(data, PublishReportSchema);
    },
  });
};

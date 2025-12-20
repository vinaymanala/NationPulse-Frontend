import { utilService } from '@shared/services/api/utilService';
import { PermissionsSchema } from '@shared/types/api';
import { useQuery } from '@tanstack/react-query';

export const usePermissions = (
  isUserSignedIn: boolean | undefined,
  userID: string | null
) => {
  return useQuery({
    queryKey: ['utils'],
    queryFn: async () =>
      utilService.getUserPermissions(userID, PermissionsSchema),
    enabled: isUserSignedIn,
  });
};

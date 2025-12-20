import { userService } from '@shared/services/api/userService';
import {
  UserRefreshTokenSchema,
  UserSigninSchema,
  UserSignOutSchema,
} from '@shared/types/api';
import type { TUserFormInput, TUserObject } from '@shared/types/common';
import { useQuery, useMutation } from '@tanstack/react-query';

export const useUserSignin = () => {
  return useMutation({
    mutationKey: ['user-signin'],
    mutationFn: async (userDetails: TUserFormInput) => {
      return userService.postUserSignin(userDetails, UserSigninSchema);
    },
  });
};

export const userUserSignOut = () => {
  return useMutation({
    mutationKey: ['user-signout'],
    mutationFn: async () => {
      return userService.postUserSignOut(UserSignOutSchema);
    },
  });
};

export const useUserRefreshToken = (callRefreshToken: boolean) => {
  return useQuery({
    queryKey: ['refresh_token'],
    queryFn: async () => {
      return userService.getUserRefreshToken(UserRefreshTokenSchema);
    },
    enabled: callRefreshToken,
  });
};

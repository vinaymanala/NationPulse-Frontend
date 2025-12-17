import { userService } from '@shared/services/api/userService';
import { UserSigninSchema } from '@shared/types/api';
import type { TUserFormInput, TUserObject } from '@shared/types/common';
import { useQuery, useMutation } from '@tanstack/react-query';

export const useUserSignin = () => {
  return useMutation({
    mutationFn: async (userDetails: TUserFormInput) => {
      return userService.postUserSignin(userDetails, UserSigninSchema);
    },
  });
};

export const userUserSignOut = () => {
  return useQuery({
    queryKey: ['userSignOut'],
    queryFn: async () => {
      return userService.getUserSignOut(UserSigninSchema);
    },
  });
};

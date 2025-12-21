import { usePermissions } from '@shared/hooks/useUtils';
import type {
  AuthContextType,
  TUserFormInput,
  TUserObject,
} from '@shared/types/common';
import { formattedPermissionsData } from '@shared/utils/utils';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type JSX,
} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { apiClient } from '@shared/services/api/client';
import { authStore } from '@shared/services/authStore';

let AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // let [user, setUser] = useState<string | null>("");
  let [signedInUser, setSignedInUser] = useState<TUserObject | null>(null);

  let signin = (newUser: TUserObject | null) => {
    // callback: VoidFunction
    setSignedInUser(newUser);
    if (newUser?.accessToken) authStore.setToken(newUser.accessToken);
    // callback();
  };

  let signout = (callback: VoidFunction) => {
    setSignedInUser(null);
    callback();
  };

  let value = {
    signedInUser,
    signin,
    signout,
  };

  // Rehydrate auth on mount using refresh endpoint (refresh token should be httponly cookie)
  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await apiClient.post('/api/u/token/refresh', {});
        const user = JSON.parse(localStorage.getItem('user') || '');
        const body = resp.data?.data || resp.data;
        const token = body?.access_token || null;
        console.log({ body });
        if (!mounted) return;
        if (Object.keys(user).length) {
          const { id } = user;
          const resp = await apiClient.post('/api/uu/permissions', { id });
          const permissions = resp.data?.data;
          console.log({ permissions });
          setSignedInUser({
            ...user,
            accessToken: token,
            signin: true,
            permissions,
          });
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('permissions', JSON.stringify([...permissions]));
        }
        if (token) authStore.setToken(token);
      } catch (e) {
        // ignore - not signed in
        authStore.clearToken();
        setSignedInUser(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  const user = JSON.parse(localStorage.getItem('user') || '');
  let location = useLocation();
  console.log('REQUIREAUTH', auth.signedInUser?.signin);
  if (!auth.signedInUser?.signin && !user?.id) {
    console.log(auth.signedInUser?.signin);
    // Redirect them to the /signin page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

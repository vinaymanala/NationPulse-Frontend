import { usePermissions } from '@shared/hooks/useUtils';
import type {
  AuthContextType,
  TUserFormInput,
  TUserObject,
  TModules,
} from '@shared/types/common';
import React, { createContext, useContext, useState, type JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { apiClient } from '@shared/services/api/client';
import { authStore } from '@shared/services/authStore';
import { GetUserModules, UserHasAccess } from '@shared/utils/permissions';

let AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let [signedInUser, setSignedInUser] = useState<TUserObject | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<{
    label: string;
    code: string;
  }>({ label: 'United States', code: 'USA' });

  let signin = (newUser: TUserObject | null) => {
    setSignedInUser(newUser);
    if (newUser?.accessToken) authStore.setToken(newUser.accessToken);
  };

  let signout = (callback: VoidFunction) => {
    setSignedInUser(null);
    callback();
  };

  let value = {
    signedInUser,
    selectedCountry,
    setSelectedCountry,
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

        if (!mounted) return;
        if (Object.keys(user).length) {
          const { id } = user;
          const resp = await apiClient.post('/api/uu/permissions', { id });
          const permissions = resp.data?.data;

          setSignedInUser({
            ...user,
            accessToken: token,
            signin: true,
            isAdmin: id == 2 ? true : false,
            permissions,
          });
          localStorage.setItem(
            'user',
            JSON.stringify({ ...user, isAdmin: id === '2' ? true : false })
          );
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
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '')
    : null;
  let location = useLocation();

  console.log('REQUIREAUTH', auth.signedInUser?.signin);
  if (!auth.signedInUser?.signin && !user?.id) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Check permissions for current route. Prefer permissions from auth context,
  // otherwise fall back to permissions stored in localStorage.
  const storedPermissions = localStorage.getItem('permissions')
    ? JSON.parse(localStorage.getItem('permissions') || '[]')
    : null;
  const currentPermissions: number[] | null =
    auth.signedInUser?.permissions || storedPermissions;

  const allowed = UserHasAccess(location.pathname, currentPermissions as any);
  if (!allowed) {
    // redirect to dashboard when user lacks permission for this route
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

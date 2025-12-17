import { usePermissions } from '@shared/hooks/useUtils';
import type { AuthContextType, TUserObject } from '@shared/types/common';
import { formattedPermissionsData } from '@shared/utils/utils';
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type JSX,
} from 'react';
import { Navigate, useLocation } from 'react-router-dom';

let AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // let [user, setUser] = useState<string | null>("");
  let [loggedInUser, setLoggedInUser] = useState<TUserObject | null>(null);

  let signin = (newUser: TUserObject | null) => {
    // callback: VoidFunction
    setLoggedInUser(newUser);
    // callback();
  };

  let signout = (callback: VoidFunction) => {
    setLoggedInUser(null);
    callback();
  };

  let value = {
    loggedInUser,
    signin,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.loggedInUser?.login) {
    console.log(auth.loggedInUser?.login);
    // Redirect them to the /signin page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

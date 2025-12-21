import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from '@shared/layouts/MainLayout';
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { RequireAuth, useAuth } from './context';
import { NotFound } from '@shared/components/NotFound';
// import { usePermissions } from '@shared/hooks/useUtils';
// import { formattedPermissionsData } from '@shared/utils/utils';
// import { RequireAuth, useAuth } from './context';
const Dashboard = lazy(() => import('@features/Dashboard'));
const Population = lazy(() => import('@features/Population'));
const Health = lazy(() => import('@features/Health'));
const Economy = lazy(() => import('@features/Economy'));

function AppRoutes() {
  const auth = useAuth();
  // const [loadSideBarModules, setLoadSideBarModules] = useState(false);
  // useEffect(() => {
  //   setLoadSideBarModules(!!auth.signedInUser?.signin);
  // }, [!!auth.signedInUser?.signin]);
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* {loadSideBarModules ? ( */}
            <>
              <Route
                path="/population"
                element={
                  <RequireAuth>
                    <Population />
                  </RequireAuth>
                }
              />
              <Route
                path="/health"
                element={
                  <RequireAuth>
                    <Health />
                  </RequireAuth>
                }
              />
              <Route
                path="/economy"
                element={
                  <RequireAuth>
                    <Economy />
                  </RequireAuth>
                }
              />
            </>
            {/* ) : null} */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
}
export default AppRoutes;

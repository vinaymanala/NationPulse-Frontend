import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from '@shared/layouts/MainLayout';
import { lazy, Suspense, useEffect, useMemo } from 'react';
// import { usePermissions } from '@shared/hooks/useUtils';
// import { formattedPermissionsData } from '@shared/utils/utils';
// import { RequireAuth, useAuth } from './context';
const Dashboard = lazy(() => import('@features/Dashboard'));
const Population = lazy(() => import('@features/Population'));
const Health = lazy(() => import('@features/Health'));
const Economy = lazy(() => import('@features/Economy'));

function AppRoutes() {
  // const auth = useAuth();

  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/population" element={<Population />}></Route>
            <Route path="/health" element={<Health />}></Route>
            <Route path="/economy" element={<Economy />}></Route>
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
}
export default AppRoutes;

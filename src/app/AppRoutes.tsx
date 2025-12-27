import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '@shared/layouts/MainLayout';
import { lazy, Suspense } from 'react';
import { RequireAuth } from './context';
import { NotFound } from '@shared/components/NotFound';

const Dashboard = lazy(() => import('@features/Dashboard'));
const Population = lazy(() => import('@features/Population'));
const Health = lazy(() => import('@features/Health'));
const Economy = lazy(() => import('@features/Economy'));
const Admin = lazy(() => import('@features/Admin'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
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
              <Route
                path="/permissions"
                element={
                  <RequireAuth>
                    <Admin />
                  </RequireAuth>
                }
              />
            </>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
}
export default AppRoutes;

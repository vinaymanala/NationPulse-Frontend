import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '@shared/layouts/MainLayout';
import { lazy, Suspense } from 'react';
const Dashboard = lazy(() => import('@features/Dashboard'));
const Population = lazy(() => import('@features/Population'));
const Health = lazy(() => import('@features/Health'));
const Economy = lazy(() => import('@features/Economy'));
function AppRoutes() {
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

import { lazy, Suspense } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

const Main = lazy(() => import('@/pages/MainPage'));
const Register = lazy(() => import('@/pages/RegisterPage'));
const Login = lazy(() => import('@/pages/LoginPage'));
const NotFound = lazy(() => import('@/pages/NotFoundPage'));

const CalendarPage = lazy(() => import('@/pages/CalendarPage'));
const Statistics = lazy(() => import('@/pages/StatisticsPage'));
const Account = lazy(() => import('@/pages/AccountPage'));

const Layout = lazy(() => import('@/modules/Layout'));
const ChosenDay = lazy(() => import('@/modules/ChosenDay'));
const ChosenMonth = lazy(() => import('@/modules/ChosenMonth'));
const Calendar = lazy(() => import('@/modules/Calendar'));

import ScreenLoader from './ScreenLoader';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';
import LangSelect from './LangSelect';

import theme from '@/theme';

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications
        position="top-right"
        zIndex={1000}
        autoClose={4000}
        containerWidth={340}
      />
      <Suspense>
        <LangSelect />
      </Suspense>
      <Suspense fallback={<ScreenLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              element={
                <RestrictedRoute to="/calendar">
                  <Outlet />
                </RestrictedRoute>
              }
            >
              <Route index element={<Main />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />{' '}
              <Route path="google" element={<ScreenLoader />} />
            </Route>

            <Route
              element={
                <PrivateRoute to="/">
                  <Outlet />
                </PrivateRoute>
              }
            >
              <Route index element={<Navigate to="/calendar" />} />
              <Route path="calendar" element={<CalendarPage />}>
                <Route index element={<Calendar />} />
                <Route path="day/:currentDay" element={<ChosenDay />} />
                <Route path="month/:currentMonth" element={<ChosenMonth />} />
              </Route>
              <Route path="statistics" element={<Statistics />} />
              <Route path="account" element={<Account />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </MantineProvider>
  );
}

export default App;

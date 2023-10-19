import { useEffect } from 'react';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { useTranslation } from 'react-i18next';
// import { notifications } from '@mantine/notifications';
import { useDispatch, useSelector } from 'react-redux';
import {
  Outlet,
  // useNavigate,
  useSearchParams,
} from 'react-router-dom';

import Header from '@/modules/Header';
import SideBar from '@/modules/SideBar';

import {
  // selectError,
  selectIsAuthenticated,
  selectToken,
  // updateToken,
} from '@/redux/slices/authSlice';
import { refreshUserThunk } from '@/redux/operations';

import css from './styles/Layout.module.css';

function Layout() {
  const dispatch = useDispatch();
  // const { t } = useTranslation();

  // const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [opened, { close, open }] = useDisclosure();

  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsAuthenticated);
  // const error = useSelector(selectError);

  // useEffect(() => {
  //   if (isAuthenticated || error) return;

  //   if (token) {
  //     dispatch(refreshUserThunk());
  //     return;
  //   }

  //   const newToken = searchParams.get('token');
  //   if (!newToken) return;

  //   dispatch(updateToken(newToken));
  // }, [token, isAuthenticated, error, searchParams, dispatch]);

  useEffect(() => {
    !isLoading && dispatch(refreshUserThunk());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const refreshToken = searchParams.get('token');
    if (!refreshToken) {
      return;
    } else {
      localStorage.setItem('refreshToken', refreshToken);
      dispatch(refreshUserThunk());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  // if (!error || !token) return;
  // if (isAuthenticated) {
  //   navigate('/calendar');
  // }
  // if (!isAuthenticated) {
  //   navigate('/');
  // }
  //   // return <Outlet />;
  //   console.log(error);
  //   notifications.show({
  //     color: 'red',
  //     title: t('errors.cantFetchCurrentUser.title'),
  //     message: t('errors.cantFetchCurrentUser.message'),
  //     autoClose: 5000,
  //   });
  // }
  // }, []);

  // if (!isAuthenticated && token) {
  //   return <p>...Loading</p>;
  // }

  // if (!isAuthenticated && !token) {
  //   // navigate('/login');
  //   return <Outlet />;
  // }

  if (!token) return <Outlet />;

  if (isAuthenticated)
    return (
      <AppShell
        layout="alt"
        withBorder={false}
        header={{
          height: { base: 56, md: 68, xl: 84 },
        }}
        navbar={{
          width: { base: 225, md: 289 },
          breakpoint: 'xl',
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header className={css.header}>
          <Header onOpen={open} />
        </AppShell.Header>

        <AppShell.Navbar bg="transparent">
          <SideBar onClose={close} />
        </AppShell.Navbar>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    );
}

export default Layout;

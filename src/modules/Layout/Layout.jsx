import { useEffect } from 'react';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useSearchParams } from 'react-router-dom';

import Header from '@/modules/Header';
import SideBar from '@/modules/SideBar';

import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import { logoutUserThunk, refreshUserThunk } from '@/redux/operations';

import css from './styles/Layout.module.css';

function Layout() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [opened, { close, open }] = useDisclosure();

  const token = localStorage.getItem('refreshToken');
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsAuthenticated);

  useEffect(() => {
    (async () => {
      try {
        !isLoading && token && (await dispatch(refreshUserThunk()).unwrap());
      } catch (err) {
        if (err === 'Token invalid') dispatch(logoutUserThunk());
      }
    })();

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

        <AppShell.Navbar bg="transparent" onClick={close}>
          <SideBar onClose={close} />
        </AppShell.Navbar>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    );
}

export default Layout;

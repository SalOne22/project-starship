import { useEffect } from 'react';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import SideBar from '@/modules/SideBar';

import { selectIsAuthenticated, selectToken } from '@/redux/slices/authSlice';
import { refreshUserThunk } from '@/redux/operations';

import Header from './components/Header';

function Layout() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!token || isAuthenticated) return;

    dispatch(refreshUserThunk());
  }, [dispatch, isAuthenticated, token]);

  const [opened, { close }] = useDisclosure();

  if (!isAuthenticated) return <Outlet />;

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
      <AppShell.Header>
        <Header />
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

import { useEffect } from 'react';
import { AppShell, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useSearchParams } from 'react-router-dom';

import Header from '@/modules/Header';
import SideBar from '@/modules/SideBar';

import { selectIsAuthenticated, selectToken } from '@/redux/slices/authSlice';
import { refreshUserThunk } from '@/redux/operations';

import css from './styles/Layout.module.css';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

function Layout() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const [opened, { close, open }] = useDisclosure();

  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    (async () => {
      try {
        if (!isAuthenticated) await dispatch(refreshUserThunk()).unwrap();
      } catch {
        notifications.show({
          color: 'red',
          icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
          title: t('errors.cantFetchCurrentUser.title'),
          message: t('errors.cantFetchCurrentUser.message'),
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const refreshToken = searchParams.get('token');
    if (!refreshToken) return;

    localStorage.setItem('refreshToken', refreshToken);
    dispatch(refreshUserThunk());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!token) return <Outlet />;

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

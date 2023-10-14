import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

import Header from '@/modules/Header';
import SideBar from '@/modules/SideBar';

function Layout() {
  const [opened, { close }] = useDisclosure();

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

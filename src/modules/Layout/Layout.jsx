import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

import SideBar from '@/modules/SideBar';

import Header from './components/Header';

function Layout() {
  const [opened] = useDisclosure(false);

  return (
    <AppShell
      layout="alt"
      withBorder={false}
      header={{
        height: { base: 120, md: 132, xl: 116 },
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

      <AppShell.Navbar>
        <SideBar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default Layout;

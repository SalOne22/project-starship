import { Box, Flex, Stack, Title } from '@mantine/core';
import {
  IconUserCheck,
  IconCalendarCheck,
  IconChartBar,
} from '@tabler/icons-react';

import NavigationLink from './NavigationLink';

import css from '../styles/UserNav.module.css';

function UserNav() {
  return (
    <Box>
      <Title order={3} className={css.title}>
        User Panel
      </Title>

      <Flex direction="column" gap={{ base: 18, md: 16 }}>
        <NavigationLink
          to="/account"
          title="My account"
          icon={<IconUserCheck stroke={1.8} width={20} height={20} />}
        />
        <NavigationLink
          to="/calendar"
          title="Calendar"
          icon={<IconCalendarCheck stroke={1.8} width={20} height={20} />}
        />
        <NavigationLink
          to="/statistics"
          title="Statistics"
          icon={<IconChartBar stroke={1.8} width={20} height={20} />}
        />
      </Flex>
    </Box>
  );
}

export default UserNav;

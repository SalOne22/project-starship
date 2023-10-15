import { Box, Flex, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import {
  IconUserCheck,
  IconCalendarCheck,
  IconChartBar,
} from '@tabler/icons-react';

import NavigationLink from './NavigationLink';

import css from '../styles/UserNav.module.css';

function UserNav() {
  const { t } = useTranslation();

  return (
    <Box>
      <Title order={3} className={css.title}>
        {t('sidebar.userNav.title')}
      </Title>

      <Flex direction="column" gap={{ base: 18, md: 16 }}>
        <NavigationLink
          to="/account"
          title={t('sidebar.userNav.account')}
          icon={<IconUserCheck stroke={1.8} width={20} height={20} />}
        />
        <NavigationLink
          to="/calendar"
          title={t('sidebar.userNav.calendar')}
          icon={<IconCalendarCheck stroke={1.8} width={20} height={20} />}
        />
        <NavigationLink
          to="/statistics"
          title={t('sidebar.userNav.statistics')}
          icon={<IconChartBar stroke={1.8} width={20} height={20} />}
        />
      </Flex>
    </Box>
  );
}

export default UserNav;

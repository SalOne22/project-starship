import { Flex, Title } from '@mantine/core';

import GooseTrackLogo from '@/assets/icons/logo.svg?react';

import css from '../styles/Logo.module.css';

function Logo() {
  return (
    <Flex align="center" gap={{ base: 6, xl: 'xs' }}>
      <GooseTrackLogo className={css.logo} />
      <Title className={css.text}>
        G<span>oo</span>seTrack
      </Title>
    </Flex>
  );
}
export default Logo;

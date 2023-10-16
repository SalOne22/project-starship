import PropTypes from 'prop-types';

import { Box, Container, Flex, Stack } from '@mantine/core';

import UserNav from './components/UserNav';
import LogoutButton from './components/LogoutButton';
import Logo from './components/Logo';

import css from './styles/SideBar.module.css';
import CloseButton from './components/CloseButton';

function SideBar({ onClose }) {
  return (
    <Box className={css.sidebar}>
      <Container className={css.container}>
        <Flex
          align="center"
          justify="space-between"
          mb={{ base: 64, md: 50, xl: 32 }}
        >
          <Logo />
          <CloseButton onClose={onClose} />
        </Flex>
        <UserNav />
        <Stack justify="end" className={css.logoutBtnWrapper}>
          <LogoutButton />
        </Stack>
      </Container>
    </Box>
  );
}

SideBar.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SideBar;

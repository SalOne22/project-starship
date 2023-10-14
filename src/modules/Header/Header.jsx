import PropTypes from 'prop-types';
import { ActionIcon, Container, Flex, Title } from '@mantine/core';
import { useLocation } from 'react-router';
import { IconMenu2 } from '@tabler/icons-react';

import FeedbackBtn from '@/modules/FeedbackBtn';

import UserInfo from './components/UserInfo';

import css from './styles/Header.module.css';

const paths = {
  calendar: 'Calendar',
  statistics: 'Statistics',
  account: 'User Profile',
};

function Header({ onOpen }) {
  const location = useLocation();
  const title = paths[location.pathname.split('/')[1]];

  return (
    <Container className={css.container}>
      <ActionIcon
        className={css.burger}
        color="gray.6"
        size={24}
        variant="transparent"
        aria-label="Open sidebar"
        onClick={onOpen}
      >
        <IconMenu2 style={{ width: '100%', height: '100%' }} stroke={2} />
      </ActionIcon>
      <Title className={css.title} order={2}>
        {title}
      </Title>
      <Flex gap={{ base: 18, md: 24 }}>
        <FeedbackBtn />
        <UserInfo />
      </Flex>
    </Container>
  );
}

Header.propTypes = {
  onOpen: PropTypes.func.isRequired,
};

export default Header;

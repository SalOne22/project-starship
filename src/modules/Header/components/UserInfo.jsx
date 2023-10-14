import { Avatar, Flex, Title } from '@mantine/core';
import { useSelector } from 'react-redux';

import ThemeToggler from './ThemeToggler';

import { selectUserData } from '@/redux/slices/authSlice';

import css from '../styles/UserInfo.module.css';

function UserInfo() {
  const { username, avatarURL } = useSelector(selectUserData) ?? {};

  return (
    <Flex gap={{ base: 8, md: 14 }} align="center">
      <ThemeToggler />
      <Title className={css.username} order={3}>
        {username}
      </Title>
      <Avatar className={css.avatar} variant="outline" src={avatarURL}></Avatar>
    </Flex>
  );
}

export default UserInfo;

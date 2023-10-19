import PropTypes from 'prop-types';
import { ActionIcon, Container, Flex, Stack, Text, Title } from '@mantine/core';
import { useParams, useLocation } from 'react-router-dom';
import { IconMenu2 } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import FeedbackBtn from '@/modules/FeedbackBtn';
import { useTasks } from '@/modules/Calendar/hooks/useTasks';

import gooseImg from '@/assets/images/header/goose.png';

import UserInfo from './components/UserInfo';

import css from './styles/Header.module.css';

function Header({ onOpen }) {
  const location = useLocation();
  const { currentDay } = useParams();
  const { t } = useTranslation();

  const { tasks } = useTasks();

  const tasksCountToDo = tasks.reduce(
    (acc, task) =>
      task.category === 'to-do' && task.date.includes(currentDay)
        ? acc + 1
        : acc,
    0,
  );

  const paths = {
    calendar: t('header.titles.calendar'),
    statistics: t('header.titles.statistics'),
    account: t('header.titles.account'),
  };

  const locationArray = location.pathname.split('/');

  const title = paths[locationArray[1]];

  return (
    <Container className={css.container}>
      <ActionIcon
        className={css.burger}
        color="gray.6"
        size={24}
        variant="transparent"
        aria-label={t('header.openHint')}
        onClick={onOpen}
      >
        <IconMenu2 style={{ width: '100%', height: '100%' }} stroke={2} />
      </ActionIcon>

      {locationArray[2] === 'day' && tasksCountToDo > 0 ? (
        <Flex gap={8} className={css.titleWrapper}>
          <img src={gooseImg} width={64} height={60} />
          <Stack gap={8}>
            <Title className={css.title} order={2}>
              {title}
            </Title>
            <Text className={css.subtitle}>
              <span>{t('header.subtitle.first')}</span>
              {t('header.subtitle.second')}
            </Text>
          </Stack>
        </Flex>
      ) : (
        <Title className={css.title} order={2}>
          {title}
        </Title>
      )}
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

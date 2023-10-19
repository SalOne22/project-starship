import {
  Button,
  Center,
  Container,
  Text,
  Title,
  VisuallyHidden,
} from '@mantine/core';
import { Link } from 'react-router-dom';

import Rocket from '@/assets/images/404/rocket.svg?react';

import css from './styles/NotFound.module.css';
import { useTranslation } from 'react-i18next';

function NotFound() {
  const { t } = useTranslation();

  return (
    <Center h="100dvh">
      <Container className={css.container}>
        <Center className={css.titleWrapper}>
          <Rocket className={css.rocket} />
          <Title className={css.title}>
            <span>4</span>
            <VisuallyHidden>0</VisuallyHidden>
            <span>4</span>
          </Title>
        </Center>
        <Text className={css.text}>{t('notFound.message')}</Text>
        <Button className={css.goBackBtn} component={Link} to="/">
          {t('notFound.back')}
        </Button>
      </Container>
    </Center>
  );
}

export default NotFound;

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

function NotFound() {
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
        <Text className={css.text}>
          We’re sorry, the page you requested could not be found. Please go back
          to the homepage.
        </Text>
        <Button className={css.goBackBtn} component={Link} to="/">
          Back to home
        </Button>
      </Container>
    </Center>
  );
}

export default NotFound;

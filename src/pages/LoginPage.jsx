import PropTypes from 'prop-types';
import Login from '@/modules/Login';
import AuthNavigate from '@/components/AuthNavigate';
import { Box, Center, Container } from '@mantine/core';
import css from './styles/LoginPage.module.css';
import Rocket from '@/assets/images/login/rocket.svg?react';
import { useTranslation } from 'react-i18next';

function LoginPage() {
  const { t } = useTranslation();

  return (
    <Center className={css.pageStyle}>
      <Container className={css.containerStyle}>
        <Box className={css.wrapper}>
          <Login />
          <AuthNavigate route="/register" text={t('register.link')} />
        </Box>
        <Box className={css.images}>
          <Rocket className={css.rocket} />
        </Box>
      </Container>
    </Center>
  );
}
LoginPage.propTypes = {
  route: PropTypes.string,
  text: PropTypes.string,
};
export default LoginPage;

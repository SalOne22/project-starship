import PropTypes from 'prop-types';
import Register from '@/modules/Register/components/RegisterForm';
import AuthNavigate from '@/components/AuthNavigate';
import { Box, Center, Container } from '@mantine/core';
import css from './styles/RegisterPage.module.css';
import Goose from '@/assets/images/register/goose.svg?react';
import { useTranslation } from 'react-i18next';

function RegisterPage() {
  const { t } = useTranslation();

  return (
    <Center className={css.pageStyle}>
      <Container className={css.containerStyle}>
        <Box className={css.images}>
          <Goose className={css.goose} />
        </Box>
        <Box className={css.wrapper}>
          <Register />
          <Box className={css.box}>
            <AuthNavigate route="/login" text={t('login.link')} />
          </Box>
        </Box>
      </Container>
    </Center>
  );
}
RegisterPage.propTypes = {
  route: PropTypes.string,
  text: PropTypes.string,
};
export default RegisterPage;

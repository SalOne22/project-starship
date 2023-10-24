import PropTypes from 'prop-types';
import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
  Loader,
  Divider,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import classes from './ForgotPassword.module.css';
import { useDispatch } from 'react-redux';
import { resetUserThunk } from '@/redux/operations';
import { useTranslation } from 'react-i18next';
import { IconAlertCircle, IconCircleCheck } from '@tabler/icons-react';

import { isEmail, useForm } from '@mantine/form';
import { useState } from 'react';
import clsx from 'clsx';

export function ForgotPassword({ onClose }) {
  const [tryReset, setTryReset] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleResetPassword = async (values) => {
    try {
      setTryReset(true);
      await dispatch(resetUserThunk(values)).unwrap();
      setSuccess(true);
      setEmail(values.email);
    } catch (error) {
      form.setErrors({ email: error });
    } finally {
      setTryReset(false);
    }
  };

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: isEmail(t('forrgotPassword.validateError')),
    },
  });

  return (
    <Container size={460} my={30} py={16}>
      {success ? (
        <>
          <div className={classes.successWraper}>
            <IconCircleCheck size={20} color="green" />
            <h3 className={classes.titleSuccess}>
              {t('forrgotPassword.successTitle')}
            </h3>
          </div>
          <p>
            {t('forrgotPassword.successMessageStart')}{' '}
            <span style={{ color: 'var(--mantine-color-blue-4)' }}>
              {email}
            </span>{' '}
            {t('forrgotPassword.successMessageEnd')}
          </p>
          <Button
            className={classes.successbtn}
            type="button"
            onClick={() => onClose()}
          >
            OK
          </Button>
        </>
      ) : (
        <>
          <Title className={classes.title} ta="center">
            {t('forrgotPassword.question')}
          </Title>
          <Divider my={8} />
          <Text c="dimmed" fz="md" ta="center">
            {t('forrgotPassword.cta')}
          </Text>

          <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <form onSubmit={form.onSubmit(handleResetPassword)}>
              <TextInput
                classNames={{
                  input: clsx(
                    classes.forgotPasswordInput,
                    form.isValid() ? classes.borderInputSuccess : null,
                    form.errors.email ? classes.borderInputError : null,
                  ),
                }}
                withAsterisk
                label="Email"
                placeholder="Enter email"
                rightSection={
                  form.errors?.email ? (
                    <IconAlertCircle color="red" size={18} />
                  ) : form.isValid('email') ? (
                    <IconCircleCheck color="green" size={18} />
                  ) : null
                }
                {...form.getInputProps('email')}
              />
              <Group
                justify="space-between"
                mt="lg"
                className={classes.controls}
              >
                <Anchor c="dimmed" size="sm" className={classes.control}>
                  <Center inline>
                    <IconArrowLeft
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                    <Box ml={5} onClick={() => onClose()}>
                      {t('forrgotPassword.back')}
                    </Box>
                  </Center>
                </Anchor>
                <Button
                  className={classes.controlBtn}
                  type="submit"
                  disabled={tryReset}
                >
                  {tryReset ? (
                    <Loader color="blue" size={20} />
                  ) : (
                    t('forrgotPassword.resetPassword')
                  )}
                </Button>
              </Group>
            </form>
          </Paper>
        </>
      )}
    </Container>
  );
}

ForgotPassword.propTypes = {
  onClose: PropTypes.func.isRequired,
};

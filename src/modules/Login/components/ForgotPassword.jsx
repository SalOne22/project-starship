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
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import classes from './ForgotPassword.module.css';
import { useDispatch } from 'react-redux';
import { resetUserThunk } from '@/redux/operations';
// import { useForm } from '@mantine/form';
import { IconAlertCircle, IconCircleCheck } from '@tabler/icons-react';

import { isEmail, useForm } from '@mantine/form';

export function ForgotPassword({ onClose }) {
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: isEmail('Word before @ and domain after the dot'),
    },
  });

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form
          onSubmit={form.onSubmit((values) => {
            dispatch(resetUserThunk(values));
            onClose();
          })}
        >
          <TextInput
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
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor c="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
                <Box ml={5} onClick={() => onClose()}>
                  Back to the login page
                </Box>
              </Center>
            </Anchor>
            <Button className={classes.control} type="submit">
              Reset password
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

ForgotPassword.propTypes = {
  onClose: PropTypes.func.isRequired,
};

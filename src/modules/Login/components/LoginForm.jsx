import { useForm } from '@mantine/form';
import {
  TextInput,
  // PasswordInput,
  Text,
  Anchor,
  Paper,
  Group,
  Button,
  Stack,
  Divider,
  Loader,
} from '@mantine/core';
import { GoogleButton } from '@/modules/Register/components/GoogleButton';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '@/redux/operations';
import css from './styles/LoginForm.module.css';
import { selectLoading } from '@/redux/slices/authSlice.js';
import { IconLogin2 } from '@tabler/icons-react';

function LoginForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val)
          ? null
          : 'Word before @ and domain after the dot',

      password: (val) =>
        val.length < 6 ? 'Password should include at least 6 characters' : null,
    },
  });

  function handleGoogleButtonClick() {
    window.location.href = 'https://gt-project.onrender.com/api/auth/google';
  }
  const inputSelectors = {
    wrapper: css['mantine-TextInput-wrapper'], // Стили корневого элемента
    input: css['mantine-TextInput-input'], // Стили элемента ввода
    label: css['mantine-TextInput-label'], // Стили элемента метки
    required: css['mantine-TextInput-required'], // Стили элемента астериска
    error: css['mantine-TextInput-error'],
    rightSection: ['mantine-TextInput-section'], // Стили элемента ошибки
  };
  return (
    <Paper className={css.wrappForm}>
      <Text className={css.titleForm} c="blue.4">
        Log In
      </Text>

      <Group className={css.wrappGoogleButton} grow>
        <GoogleButton
          className={css.googleButton}
          onClick={handleGoogleButtonClick}
          radius="xl"
        >
          Google
        </GoogleButton>
      </Group>
      <Divider
        className={css.divider}
        label="Or continue with email"
        labelPosition="center"
      />
      {/* <form onSubmit={form.onSubmit}> */}
      <form
        className={css.form}
        onSubmit={form.onSubmit((values) => {
          dispatch(loginUserThunk(values));
        })}
      >
        <Stack className={css.stack}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="Enter email"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
            // className={css.input}
            classNames={inputSelectors}
          />

          <TextInput
            withAsterisk
            label="Password"
            placeholder="Enter password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={
              form.errors.password &&
              'Password should include at least 6 characters'
            }
            // className={css.input}
            classNames={inputSelectors}
          />
        </Stack>

        <Group className={css.wrappButton}>
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
          {isLoading ? (
            <Loader c="blue.4" />
          ) : (
            <Button
              className={css.button}
              rightSection={<IconLogin2 size={18} />}
              type="submit"
            >
              <Text className={css.textButtonForm}>Log In</Text>
            </Button>
          )}
        </Group>
      </form>
    </Paper>
  );
}
export default LoginForm;

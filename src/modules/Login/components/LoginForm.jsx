import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
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
import css from './LoginForm.module.css';
import { selectLoading } from '@/redux/slices/authSlice.js';

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
            className={css.input}
          />

          <PasswordInput
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
            className={css.input}
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
              // rightSection={<IconL size={18} />}
              rightSection={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.75 2.25H12.65C13.9101 2.25 14.5402 2.25 15.0215 2.49524C15.4448 2.71095 15.789 3.05516 16.0048 3.47852C16.25 3.95982 16.25 4.58988 16.25 5.85V12.15C16.25 13.4101 16.25 14.0402 16.0048 14.5215C15.789 14.9448 15.4448 15.289 15.0215 15.5048C14.5402 15.75 13.9101 15.75 12.65 15.75H11.75M8 5.25L11.75 9M11.75 9L8 12.75M11.75 9L2.75 9"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
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

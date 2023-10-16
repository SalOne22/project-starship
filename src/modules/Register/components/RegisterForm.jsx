//  ----форма montin на двух роутах

import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Stack,
  Loader,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserThunk } from '@/redux/operations';
import css from './RegisterForm.module.css';
import { selectLoading } from '@/redux/slices/authSlice.js';

function RegisterForm(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validate: {
      username: (val) =>
        /^[A-Za-z\s]+$/.test(val)
          ? null
          : 'Name should only contain letters and spaces',

      email: (val) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val)
          ? null
          : ' Word before @ and domain after the dot',

      password: (val) =>
        val.length < 6 ? 'Password should include at least 6 characters' : null,
    },
  });

  function handleGoogleButtonClick() {
    window.location.href = 'https://gt-project.onrender.com/api/auth/google';
  }

  const handleSubmit = async (values) => {
    // try {
    //   await dispatch(registerUserThunk(values))
    // } catch (error) {
    //   handleError(error)
    // }
    dispatch(registerUserThunk(values));
  };

  return (
    <Paper
      className={css.wrappForm}
      style={{ width: '335px' }}
      radius="md"
      p="xl"
      withBorder
      {...props}
    >
      <Text size="lg" fw={500}>
        Sign Up
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton onClick={handleGoogleButtonClick} radius="xl">
          {/* <GoogleButton onClick={form.onClick} radius="xl"> */}
          Google
        </GoogleButton>
      </Group>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Your name"
            value={form.values.username}
            onChange={(event) => {
              form.setFieldValue('username', event.currentTarget.value);
            }}
            error={
              form.errors.username &&
              'Name should only contain letters and spaces'
            }
            radius="md"
          />

          <TextInput
            withAsterisk
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={
              form.errors.email &&
              'Word is needed before @ and domain after the dot'
            }
            radius="md"
          />

          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={
              form.errors.password &&
              'Password should include at least 6 characters'
            }
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          {isLoading ? (
            <Loader color="blue" />
          ) : (
            <Button type="submit" radius="xl">
              Sign Up
            </Button>
          )}
        </Group>
      </form>
    </Paper>
  );
}
export default RegisterForm;

{
  /* <Button disabled={isLoading} type="submit" radius="xl">
            Sign Up
          </Button> */
}
{
  /* <form
        onSubmit={form.onSubmit((values) => {
          dispatch(registerUserThunk(values));
        })}
      > */
}

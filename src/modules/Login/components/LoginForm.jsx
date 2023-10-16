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
} from '@mantine/core';
import { GoogleButton } from '@/modules/Register/components/GoogleButton';
import { useDispatch } from 'react-redux';
import { loginUserThunk } from '@/redux/operations';

function LoginForm(props) {
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val)
          ? null
          : 'Invalid email',

      password: (val) =>
        val.length < 6 ? 'Password should include at least 6 characters' : null,
    },
  });

  function handleGoogleButtonClick() {
    window.location.href = 'https://gt-project.onrender.com/api/auth/google';
  }

  const wrappLoginFormStyle = {
    width: '335px',
  };

  return (
    <Paper style={wrappLoginFormStyle} radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Log In
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton onClick={handleGoogleButtonClick} radius="xl">
          Google
        </GoogleButton>
      </Group>

      {/* <form onSubmit={form.onSubmit}> */}
      <form
        onSubmit={form.onSubmit((values) => {
          dispatch(loginUserThunk(values));
        })}
      >
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
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
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
          <Button type="submit" radius="xl">
            Log in
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
export default LoginForm;

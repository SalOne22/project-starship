//  ----форма montin на двух роутах

// import { useForm } from '@mantine/form';
import { hasLength, isEmail, useForm } from '@mantine/form';

import {
  TextInput,
  Text,
  Paper,
  Group,
  Button,
  Stack,
  Loader,
  Divider,
  PasswordInput,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserThunk } from '@/redux/operations';
import css from './styles/RegisterForm.module.css';
import { selectLoading } from '@/redux/slices/authSlice.js';
import {
  IconAlertCircle,
  IconCircleCheck,
  IconLogin2,
} from '@tabler/icons-react';
import clsx from 'clsx';
import theme from '@/theme.js';

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
      username: hasLength(
        { min: 2 },
        'Enter a name with a minimum of 2 characters',
      ),
      email: isEmail('Word before @ and domain after the dot'),

      password: hasLength(
        { min: 6 },
        'Password should include at least 6 characters',
      ),
    },
  });

  function handleGoogleButtonClick() {
    window.location.href = 'https://gt-project.onrender.com/api/auth/google';
  }

  const handleSubmit = async (values) => {
    dispatch(registerUserThunk(values));
  };

  return (
    <Paper className={css.wrappForm} c="white" withBorder {...props}>
      <Text className={css.titleForm} c="blue.4">
        Sign Up
      </Text>

      <Group className={css.wrappGoogleButton} grow>
        <GoogleButton
          className={css.googleButton}
          onClick={handleGoogleButtonClick}
        >
          Google
        </GoogleButton>
      </Group>
      <Divider
        className={css.divider}
        label="Or continue with email"
        labelPosition="center"
      />
      <form className={css.form} onSubmit={form.onSubmit(handleSubmit)}>
        <Stack className={css.stack}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Enter your name"
            rightSection={
              form.errors?.username ? (
                <IconAlertCircle color={theme.colors.red[4]} size={18} />
              ) : form.values.username.length > 1 ? (
                <IconCircleCheck color={theme.colors.green[6]} size={18} />
              ) : null
            }
            {...form.getInputProps('username')}
            classNames={{
              label: form.isValid('username')
                ? css.labelCorrect
                : form.errors.username
                ? css.labelError
                : css.label,
              error: css.error,
              required: form.isValid('username')
                ? css.requiredCorrect
                : form.errors.username
                ? css.requiredError
                : css.required,

              rightSection: css.section,
              input: clsx(
                css.input,
                form.isValid('username') ? css.inputCorrect : null,
              ),
            }}
          />

          <TextInput
            withAsterisk
            label="Email"
            placeholder="Enter email"
            rightSection={
              form.errors?.email ? (
                <IconAlertCircle color={theme.colors.red[4]} size={18} />
              ) : form.isValid('email') ? (
                <IconCircleCheck color={theme.colors.green[6]} size={18} />
              ) : null
            }
            {...form.getInputProps('email')}
            classNames={{
              label: form.isValid('email')
                ? css.labelCorrect
                : form.errors.email
                ? css.labelError
                : css.label,
              error: css.error,
              required: form.isValid('email')
                ? css.requiredCorrect
                : form.errors.username
                ? css.requiredError
                : css.required,
              rightSection: css.section,
              input: clsx(
                css.input,
                form.isValid('email') ? css.inputCorrect : null,
              ),
            }}
          />

          {/* <TextInput */}
          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Enter password"
            rightSection={
              form.errors?.password ? (
                <IconAlertCircle color={theme.colors.red[4]} size={18} />
              ) : form.values.password.length > 5 ? (
                <IconCircleCheck color={theme.colors.green[6]} size={18} />
              ) : null
            }
            {...form.getInputProps('password')}
            classNames={{
              label: form.isValid('password')
                ? css.labelCorrect
                : form.errors.password
                ? css.labelError
                : css.label,
              error: css.error,
              required: form.isValid('password')
                ? css.requiredCorrect
                : form.errors.username
                ? css.requiredError
                : css.required,
              rightSection: css.section,
              input: clsx(
                css.input,
                form.isValid('password') ? css.inputCorrect : null,
              ),
              innerInput: css.inputInput,
            }}
          />
        </Stack>

        <Group className={css.wrappButton}>
          {isLoading ? (
            <Loader c={theme.colors.blue[4]} />
          ) : (
            <Button
              className={css.button}
              rightSection={<IconLogin2 size={18} />}
              type="submit"
            >
              <Text className={css.textButtonForm}> Sign Up</Text>
            </Button>
          )}
        </Group>
      </form>
    </Paper>
  );
}
export default RegisterForm;

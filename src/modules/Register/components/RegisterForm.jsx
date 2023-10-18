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

  const inputSelectors = {
    wrapper: css.wrapper,
    label: css.label,
    required: css.required,
    error: css.error,
    rightSection: css.section,
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
                <IconAlertCircle color="red" size={18} />
              ) : form.values.username.length > 1 ? (
                <IconCircleCheck color="green" size={18} />
              ) : null
            }
            {...form.getInputProps('username')}
            classNames={{
              inputSelectors,
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
                <IconAlertCircle color="red" size={18} />
              ) : form.isValid('email') ? (
                <IconCircleCheck color="green" size={18} />
              ) : null
            }
            {...form.getInputProps('email')}
            classNames={{
              inputSelectors,
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
                <IconAlertCircle color="red" size={18} />
              ) : form.values.password.length > 5 ? (
                <IconCircleCheck color="green" size={18} />
              ) : null
            }
            {...form.getInputProps('password')}
            classNames={{
              inputSelectors,
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
            <Loader c="blue.4" />
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

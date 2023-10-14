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

    // onSubmit: (values) => {
    //   console.log(222)
    //   dispatch(loginUserThunk(values));
    // },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });

  function handleGoogleButtonClick() {
    window.location.href = 'https://gt-project.onrender.com/api/auth/google';
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
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

// -----форма на formik
// // import React from 'react';
// import { Navigate } from 'react-router-dom';

// import { useFormik } from 'formik';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUserThunk } from '@/redux/operations';
// import { selectIsAuthenticated } from '@/redux/slices/authSlice';
// import css from './LoginForm.module.css';

// function LoginForm() {
//   const isAuthenticated = useSelector(selectIsAuthenticated);
//   // console.log('isAuthenticated in login', isAuthenticated)
//   const dispatch = useDispatch();
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     onSubmit: (values) => {
//       dispatch(loginUserThunk(values));
//     },
//   });

//   if (isAuthenticated) return <Navigate to="/calendar" />;
//   return (
//     <div className={css.boxLogin}>
//       <h2 className={css.headerLogin}>Log In</h2>
//       <form className={css.formLogin} onSubmit={formik.handleSubmit}>
//         <label className={css.labelLogin} htmlFor="email">
//           Email
//         </label>
//         <input
//           className={css.inputLogin}
//           id="email"
//           name="email"
//           type="email"
//           onChange={formik.handleChange}
//           value={formik.values.email}
//           required
//           maxLength={30}
//         />
//         <label className={css.labelLogin} htmlFor="password">
//           Password
//         </label>
//         <input
//           className={css.inputLogin}
//           id="password"
//           name="password"
//           type="password"
//           onChange={formik.handleChange}
//           value={formik.values.password}
//           minLength={7}
//           required
//         />
//         <button className={css.buttonLogin} type="submit">
//           Log In
//         </button>
//       </form>
//     </div>
//   );
// }

// export default LoginForm;

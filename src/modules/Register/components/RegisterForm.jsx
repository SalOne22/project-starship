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
} from '@mantine/core';
import { GoogleButton } from './GoogleButton.jsx';
import { useDispatch } from 'react-redux';
import { registerUserThunk } from '@/redux/operations';

function RegisterForm(props) {
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },

    // onSubmit: (values) => {
    //   // console.log(222)
    //   dispatch(registerUserThunk(values));
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
        Sign Up
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton onClick={handleGoogleButtonClick} radius="xl">
          {/* <GoogleButton onClick={form.onClick} radius="xl"> */}
          Google
        </GoogleButton>
      </Group>

      {/* <form onSubmit={form.onSubmit}> */}
      <form
        onSubmit={form.onSubmit((values) => {
          dispatch(registerUserThunk(values));
        })}
      >
        <Stack>
          <TextInput
            label="Name"
            placeholder="Your name"
            value={form.values.username}
            onChange={(event) =>
              form.setFieldValue('username', event.currentTarget.value)
            }
            radius="md"
          />

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
          <Button type="submit" radius="xl">
            Sign Up
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
export default RegisterForm;

//  ----форма montin на одном роуте

// import { useToggle, upperFirst } from '@mantine/hooks';
// import { useForm } from '@mantine/form';
// import {
//   TextInput,
//   PasswordInput,
//   Text,
//   Paper,
//   Group,
//   Button,
//   Divider,
//   // Checkbox,
//   Anchor,
//   Stack,
// } from '@mantine/core';
// import { GoogleButton } from './GoogleButton.jsx';
// import { useDispatch,  } from 'react-redux';
// import { registerUserThunk, loginUserThunk } from '@/redux/operations';

//  function AuthenticationForm(props) {

//  const dispatch = useDispatch();

//   const [type,
//     toggle
//   ] = useToggle(['login', 'register']);
//   const form = useForm({
//     initialValues: {
//       email: '',
//       username: '',
//       password: '',
//     },

//     onSubmit: ({email, username, password}) => {
//       if (type === 'register') {
//         dispatch(registerUserThunk(email, username, password));
//       } else if (type === 'login') {
//         dispatch(loginUserThunk(email, password));
//       }
//     },

//     // onClick: ()=>{
//     //   window.location.href = 'https://gt-project.onrender.com/api/auth/google';
//     // },

//     validate: {
//       email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
//       password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
//     },
//   });

//   function handleGoogleButtonClick (){
//     window.location.href = 'https://gt-project.onrender.com/api/auth/google';
//   }

//   return (
//     <Paper radius="md" p="xl" withBorder {...props}>
//       <Text size="lg" fw={500}>
//          {type}
//         Sin Up
//       </Text>

//       <Group grow mb="md" mt="md">
//          <GoogleButton onClick={handleGoogleButtonClick} radius="xl">
//          {/* <GoogleButton onClick={form.onClick} radius="xl"> */}

//           Google
//           </GoogleButton>
//       </Group>

//       <Divider label="Or continue with email" labelPosition="center" my="lg" />

//       {/* <form onSubmit={form.onSubmit}> */}
//       <form onSubmit={form.onSubmit((values) => {
//         const {email, username, password} = values
//         dispatch(registerUserThunk(values));
//         // {type === 'register'
//         //       ? dispatch(registerUserThunk(values))
//         //       : dispatch(loginUserThunk(values))
//         // }
//         if (type === 'register') {
//           console.log(222, values)
//           dispatch(registerUserThunk(email, username, password));
//         } else if (type === 'login') {
//           console.log(333, email, password)
//           dispatch(loginUserThunk(email, password));
//         }
//       }
//       )}
//       >

//         <Stack>
//           {type === 'register' && (
//             <TextInput
//               label="Name"
//               placeholder="Your name"
//               value={form.values.username}
//               onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
//               radius="md"
//             />
//           )}

//           <TextInput
//             required
//             label="Email"
//             placeholder="hello@mantine.dev"
//             value={form.values.email}
//             onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
//             error={form.errors.email && 'Invalid email'}
//             radius="md"
//           />

//           <PasswordInput
//             required
//             label="Password"
//             placeholder="Your password"
//             value={form.values.password}
//             onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
//             error={form.errors.password && 'Password should include at least 6 characters'}
//             radius="md"
//           />

//         </Stack>

//         <Group justify="space-between" mt="xl">

//           <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
//             {type === 'register'
//               ? 'Already have an account? Login'
//               : "Don't have an account? Register"}
//           </Anchor>
//           <Button type="submit" radius="xl">
//             {upperFirst(type)}

//           </Button>
//         </Group>
//       </form>
//     </Paper>
//   );
// }
// export default AuthenticationForm

// -----------------------

// -----форма на formik
// // import React from 'react'
// import { Navigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerUserThunk } from '@/redux/operations';
// import { selectIsAuthenticated } from '@/redux/slices/authSlice';
// import RegisterSchema from '@/modules/Register/components/RegisterSchema';
// import { yupResolver } from '@mantine/form';
// import css from './RegisterForm.module.css';

// function RegisterForm() {
//   const isAuthenticated = useSelector(selectIsAuthenticated);
//   // console.log("isAuthenticated in register", isAuthenticated)//
//   const dispatch = useDispatch();

//   const formik = useFormik({
//     initialValues: {
//       username: '',
//       email: '',
//       password: '',
//     },
//     resolver: yupResolver(RegisterSchema),

//     onSubmit: (values) => {
//       dispatch(registerUserThunk(values));
//     },
//   });

//   if (isAuthenticated) {
//     return <Navigate to="/calendar" />;
//   } //потім /calendar/month

//   return (
//     <div className={css.boxRegister}>
//       <h2 className={css.headerRegister}>Sing Up</h2>
//       <form className={css.formRegister} onSubmit={formik.handleSubmit}>
//         <label className={css.labelRegister} htmlFor="username">
//           Name
//         </label>
//         <input
//           className={css.inputRegister}
//           id="username"
//           name="username"
//           type="text"
//           onChange={formik.handleChange}
//           value={formik.values.name}
//           placeholder="Enter your name"
//           minLength={2}
//           required
//         />
//         <label className={css.labelRegister} htmlFor="email">
//           Email
//         </label>
//         <input
//           className={css.inputRegister}
//           id="email"
//           name="email"
//           type="email"
//           onChange={formik.handleChange}
//           value={formik.values.email}
//           placeholder="Enter email"
//           required
//           maxLength={30}
//         />
//         <label className={css.labelRegister} htmlFor="password">
//           Password
//         </label>
//         <input
//           className={css.inputRegister}
//           id="password"
//           name="password"
//           type="password"
//           onChange={formik.handleChange}
//           value={formik.values.password}
//           placeholder="Enter password"
//           minLength={7}
//           required
//         />
//         <button className={css.buttonRegister} type="submit">
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }

// export default RegisterForm;

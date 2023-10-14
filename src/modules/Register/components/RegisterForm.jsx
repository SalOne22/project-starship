// import React from 'react'
import { Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserThunk } from '@/redux/operations';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import RegisterSchema from '@/modules/Register/components/RegisterSchema';
import { yupResolver } from '@mantine/form';
import css from './RegisterForm.module.css';

function RegisterForm() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // console.log("isAuthenticated in register", isAuthenticated)//
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(RegisterSchema),

    onSubmit: (values) => {
      dispatch(registerUserThunk(values));
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/calendar" />;
  } //потім /calendar/month

  return (
    <div className={css.boxRegister}>
      <h2 className={css.headerRegister}>Sing Up</h2>
      <form className={css.formRegister} onSubmit={formik.handleSubmit}>
        <label className={css.labelRegister} htmlFor="username">
          Name
        </label>
        <input
          className={css.inputRegister}
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder="Enter your name"
          minLength={2}
          required
        />
        <label className={css.labelRegister} htmlFor="email">
          Email
        </label>
        <input
          className={css.inputRegister}
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Enter email"
          required
          maxLength={30}
        />
        <label className={css.labelRegister} htmlFor="password">
          Password
        </label>
        <input
          className={css.inputRegister}
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Enter password"
          minLength={7}
          required
        />
        <button className={css.buttonRegister} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;

//  function RegisterForm(props, PaperProps) {

//   const [type, toggle] = useToggle(['login', 'register']);
//   const form = useForm({
//     initialValues: {
//       email: '',
//       name: '',
//       password: '',
//       terms: true,
//     },

//     validate: {
//       email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
//       password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
//     },
//   });

//   return (
//     <Paper radius="md" p="xl" withBorder {...props}>
//       <Text size="lg" fw={500}>
//       Sign Up
//       </Text>

//       <form onSubmit={form.onSubmit(() => {})}>
//         <Stack>
//           {type === 'register' && (
//             <TextInput
//               label="Name"
//               placeholder="Your name"
//               value={form.values.name}
//               onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
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

//           {type === 'register' && (
//             <Checkbox
//               label="I accept terms and conditions"
//               checked={form.values.terms}
//               onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
//             />
//           )}
//         </Stack>
//         <Button type="submit" radius="xl">
//             {upperFirst(type)}
//           </Button>

//       </form>
//     </Paper>
//   );
// }

// const handleSubmit = (event) => {
//   event.preventDefault();
//   const name = event.target.elements.name.value;
//   const email = event.target.elements.email.value;
//   const password = event.target.elements.password.value;

// const finalUserData = {
//   name,
//   email,
//   password,
// };
// console.log(finalUserData);

//   dispatch(registerUserThunk({
//     name,
//     email,
//     password,
//   }))
// };

/* <Paper radius="md" p="xl" withBorder {...props}>
<Text size="lg" fw={500}>
  Welcome to Mantine, {type} with
</Text>

<form onSubmit={form.onSubmit(() => {})}>
  <Stack>
    {type === 'register' && (
      <TextInput
        label="Name"
        placeholder="Your name"
        value={form.values.name}
        onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
        radius="md"
      />
    )}

    <TextInput
      required
      label="Email"
      placeholder="hello@mantine.dev"
      value={form.values.email}
      onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
      error={form.errors.email && 'Invalid email'}
      radius="md"
    />

//     <PasswordInput
//       required
//       label="Password"
//       placeholder="Your password"
//       value={form.values.password}
//       onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
//       error={form.errors.password && 'Password should include at least 6 characters'}
//       radius="md"
//     />

//     {type === 'register' && (
//       <Checkbox
//         label="I accept terms and conditions"
//         checked={form.values.terms}
//         onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
//       />
//     )}
//   </Stack>


//     <Button type="submit" radius="xl">
//       {upperFirst(type)}
//     </Button>

// </form>
// </Paper> */

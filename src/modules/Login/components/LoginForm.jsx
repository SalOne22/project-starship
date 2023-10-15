// import React from 'react';
import { Navigate } from 'react-router-dom';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '@/redux/operations';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import css from './LoginForm.module.css';

function LoginForm() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // console.log('isAuthenticated in login', isAuthenticated)
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      dispatch(loginUserThunk(values));
    },
  });
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const email = event.target.elements.email.value;
  //   const password = event.target.elements.password.value;

  //   const finalUserData = {

  //     email,
  //     password,
  //   };
  //   console.log(finalUserData);

  //   dispatch(loginUserThunk({

  //     email,
  //     password,
  //   }))
  // };
  if (isAuthenticated) return <Navigate to="/calendar" />;
  return (
    <div className={css.boxLogin}>
      <h2 className={css.headerLogin}>Log In</h2>
      <form className={css.formLogin} onSubmit={formik.handleSubmit}>
        <label className={css.labelLogin} htmlFor="email">
          Email
        </label>
        <input
          className={css.inputLogin}
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          required
          maxLength={30}
        />
        <label className={css.labelLogin} htmlFor="password">
          Password
        </label>
        <input
          className={css.inputLogin}
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          minLength={7}
          required
        />
        <button className={css.buttonLogin} type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

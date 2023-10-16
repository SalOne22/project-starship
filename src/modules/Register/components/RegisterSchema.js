import * as yup from 'yup';
const RegisterSchema = yup.object().shape({
  name: yup
    .string()
    .required('Required')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),

  email: yup.string().required('Required').email('Invalid email'),
  password: yup
    .string()
    .required('Required')
    .min(2, 'Too Short!')
    .max(20, 'Too Long!'),
});

export default RegisterSchema;

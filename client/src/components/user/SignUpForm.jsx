import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import Button from '../ui/Button.jsx';
import { useAuth } from './useAuth.js';
import { getLoading } from './userSlice.js';

function SignUpForm() {
  const { signUpUser } = useAuth();
  const isLoading = useSelector(getLoading);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username cannot be shorter than 3 characters')
        .max(20, 'Username cannot be longer than 20 characters')
        .required('Please enter your username'),
      password: Yup.string()
        .min(8, 'Password cannot be shorter than 8 characters')
        .max(30, 'Password cannot be longer than 30 characters')
        .required('Please enter your password'),
    }),
    onSubmit: async values => {
      await signUpUser(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col w-full gap-4">
      <div className="flex flex-col gap-2.5 w-full">
        <input
          type="text"
          placeholder="Username"
          className={`rounded-lg px-3 py-2 focus:outline-none text-2xl ${
            formik.touched.username && formik.errors.username
              ? 'border-red-700 border'
              : ''
          }`}
          {...formik.getFieldProps('username')}
        />
        {formik.touched.username && formik.errors.username ? (
          <p className="text-lg text-red-700">{formik.errors.username}</p>
        ) : null}
        <input
          type="password"
          placeholder="Password"
          className={`rounded-lg px-3 py-2 focus:outline-none text-2xl ${
            formik.touched.password && formik.errors.password
              ? 'border-red-700 border'
              : ''
          }`}
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="text-lg text-red-700">{formik.errors.password}</p>
        ) : null}
      </div>
      <Button disabled={isLoading}>Sign Up</Button>
    </form>
  );
}

export default SignUpForm;

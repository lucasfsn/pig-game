import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../ui/Button.jsx';
import { useSettings } from './useSettings.js';

function ChangeRole() {
  const { changeRole } = useSettings();

  const formik = useFormik({
    initialValues: {
      username: '',
      role: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      role: Yup.string()
        .oneOf(['admin', 'player'], 'Role must be either admin or player')
        .required('Role is required'),
    }),
    onSubmit: async values => {
      await changeRole(values.username, values.role);
      formik.handleReset();
    },
  });

  return (
    <div className="mt-20 flex flex-col gap-3">
      <h1 className="font-semibold text-4xl text-center">Change user role</h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-1">
        <input
          type="text"
          placeholder="Username"
          className="px-3 py-1.5 focus:outline-none text-2xl text-gray-700 rounded-full"
          {...formik.getFieldProps('username')}
        />
        {formik.touched.username && formik.errors.username ? (
          <p className="text-lg text-red-300 text-center">
            {formik.errors.username}
          </p>
        ) : null}
        <input
          type="text"
          placeholder="New role"
          className="px-3 py-1.5 focus:outline-none text-2xl text-gray-700 rounded-full"
          {...formik.getFieldProps('role')}
        />
        {formik.touched.role && formik.errors.role ? (
          <p className="text-lg text-red-300 text-center">
            {formik.errors.role}
          </p>
        ) : null}
        <Button bgColor="bg-blue-400">Change</Button>
      </form>
    </div>
  );
}

export default ChangeRole;

import { useFormik } from 'formik';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import Button from '../ui/Button.jsx';
import { getLoading, getUser } from '../user/userSlice.js';
import { useSettings } from './useSettings.js';

function Settings() {
  const { changeUsername, changePassword, deleteAccount } = useSettings();
  const isLoading = useSelector(getLoading);
  const user = useSelector(getUser);

  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username cannot be shorter than 3 characters')
        .max(20, 'Username cannot be longer than 20 characters'),
      password: Yup.string()
        .min(8, 'Password cannot be shorter than 8 characters')
        .max(30, 'Password cannot be longer than 30 characters'),
    }),
    onSubmit: async values => {
      if (values.username) await changeUsername(values.username, user._id);
      if (values.password) await changePassword(values.password, user._id);
    },
  });

  return (
    <div className="flex flex-col gap-5 justify-center items-center px-2 py-10">
      <h1 className="font-semibold text-4xl">Settings</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 border-b border-gray-950 pb-4 w-[275px]"
      >
        <div className="flex flex-col gap-2.5 w-full">
          <div
            className={`bg-white w-full text-gray-700 rounded-lg flex overflow-hidden ${
              formik.touched.username && formik.errors.username
                ? 'border-red-300 border'
                : ''
            }`}
          >
            <p className="bg-gray-200 p-1 text-xl whitespace-nowrap flex items-center w-1/3">
              New username
            </p>
            <input
              type="text"
              placeholder={user?.username}
              className="px-1 py-2 focus:outline-none text-2xl text-gray-700"
              {...formik.getFieldProps('username')}
            />
          </div>
          {formik.touched.username && formik.errors.username ? (
            <p className="text-lg text-red-300">{formik.errors.username}</p>
          ) : null}
          <div
            className={`bg-white w-full text-gray-700 rounded-lg flex overflow-hidden ${
              formik.touched.password && formik.errors.password
                ? 'border-red-300 border'
                : ''
            }`}
          >
            <p className="bg-gray-200 p-1 text-xl whitespace-nowrap flex items-center w-1/3">
              New password
            </p>
            <input
              type="text"
              className="px-1 py-2 focus:outline-none text-2xl text-gray-700"
              {...formik.getFieldProps('password')}
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <p className="text-lg text-red-300">{formik.errors.password}</p>
          ) : null}
        </div>
        <Button disabled={isLoading}>Change</Button>
      </form>
      <Button
        bgColor="bg-red-800"
        onClick={() => setShowConfirm(true)}
        disabled={showConfirm}
      >
        Delete account
      </Button>
      {showConfirm && (
        <div className="flex gap-2">
          <Button
            bgColor="bg-green-800"
            onClick={async () => {
              await deleteAccount(user._id);
            }}
          >
            Confirm
          </Button>
          <Button bgColor="bg-red-800" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}

export default Settings;

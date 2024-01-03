import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  accountDelete,
  error,
  fetching,
  passwordChange,
  usernameChange,
} from '../user/userSlice.js';
import {
  changePasswordApi,
  changeRoleApi,
  changeUsernameApi,
  deleteAccountApi,
} from './apiSettings.js';

export function useSettings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function changeUsername(username, id) {
    dispatch(fetching());

    try {
      const { message, player } = await changeUsernameApi(username, id);

      dispatch(usernameChange(username));
      Cookies.set('user', JSON.stringify(player));

      toast.success(message);
    } catch (err) {
      toast.error(err.response.data.message || 'An unexpected error occurred');

      dispatch(error());
    }
  }

  async function changePassword(password, id) {
    dispatch(fetching());

    try {
      const { message } = await changePasswordApi(password, id);

      dispatch(passwordChange());

      Cookies.remove('user');

      toast.success(message);
    } catch (err) {
      toast.error(err.response.data.message || 'An unexpected error occurred');

      dispatch(error());
    }
  }

  async function deleteAccount(id) {
    dispatch(fetching());

    try {
      const { message } = await deleteAccountApi(id);

      dispatch(accountDelete());

      toast.success(message);

      Cookies.remove('user');

      navigate('/login', { replace: true });
    } catch (err) {
      toast.error(err.response.data.message || 'An unexpected error occurred');

      dispatch(error());
    }
  }

  async function changeRole(username, role) {
    try {
      const { message } = await changeRoleApi(username, role);

      toast.success(message);
    } catch (err) {
      toast.error(err.response.data.message || 'An unexpected error occurred');
    }
  }

  return { changeUsername, changePassword, deleteAccount, changeRole };
}

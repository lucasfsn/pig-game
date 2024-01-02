import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginApi, signupApi } from './apiAuth.js';
import { error, fetching, login, logout } from './userSlice.js';

export function useAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function loginUser(user) {
    dispatch(fetching());

    try {
      const { message, player } = await loginApi(user);

      Cookies.set('user', JSON.stringify(player));

      dispatch(login(player));

      toast.success(message);

      navigate('/', { replace: true });
    } catch (err) {
      toast.error(err.response.data.message || 'An unexpected error occurred');

      dispatch(error());
    }
  }

  async function signUpUser(user) {
    dispatch(fetching());

    try {
      const { message, player } = await signupApi(user);

      Cookies.set('user', JSON.stringify(player));

      dispatch(login(player));

      toast.success(message);

      navigate('/', { replace: true });
    } catch (err) {
      toast.error(err.response.data.message || 'An unexpected error occurred');

      dispatch(error());
    }
  }

  async function logoutUser() {
    Cookies.remove('user');

    dispatch(logout());

    toast.success('Logged out successfully');

    navigate('/login');
  }

  return { loginUser, signUpUser, logoutUser };
}

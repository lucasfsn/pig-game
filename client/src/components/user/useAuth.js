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
      const { message, player, token } = await loginApi(user);

      Cookies.set('user', JSON.stringify(player));
      Cookies.set('token', token);

      dispatch(login(player));

      toast.success(message);

      navigate('/', { replace: true });
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'An unexpected error occurred'
      );

      dispatch(error());
    }
  }

  async function signUpUser(user) {
    dispatch(fetching());

    try {
      const { message, player, token } = await signupApi(user);

      Cookies.set('user', JSON.stringify(player));
      Cookies.set('token', token);

      console.log(player);

      dispatch(login(player));

      toast.success(message);

      navigate('/', { replace: true });
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'An unexpected error occurred'
      );

      dispatch(error());
    }
  }

  async function logoutUser(type) {
    Cookies.remove('user');
    Cookies.remove('token');

    dispatch(logout());

    if (type === 'logout') toast.success('Logged out successfully');
    else if (type === 'ban')
      toast("You've been banned", {
        icon: '⛔',
      });

    navigate('/login', { replace: true });
  }

  return { loginUser, signUpUser, logoutUser };
}

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useMqttSubscribe } from '../../hooks/useMqttSubscribe.js';
import { useAuth } from '../user/useAuth.js';
import { changeBanStatus, getLoading, getUser } from '../user/userSlice.js';
import Header from './Header.jsx';
import Spinner from './Spinner.jsx';

function AppLayout() {
  const isLoading = useSelector(getLoading);
  const user = useSelector(getUser);

  const { logoutUser } = useAuth();
  const dispatch = useDispatch();

  const [message, clearMessage] = useMqttSubscribe('player/ban');

  useEffect(() => {
    if (user && user._id === message) {
      dispatch(changeBanStatus('banned'));
      logoutUser('ban');
    }

    clearMessage();
  }, [user, dispatch, logoutUser, message, clearMessage]);

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="w-full text-white h-full flex-grow bg-gray-950">
        {isLoading ? <Spinner /> : null}
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

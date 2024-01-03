import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import socket from '../../socket.js';
import { useAuth } from '../user/useAuth.js';
import { changeBanStatus, getLoading, getUser } from '../user/userSlice.js';
import Header from './Header.jsx';
import Spinner from './Spinner.jsx';

function AppLayout() {
  const isLoading = useSelector(getLoading);
  const user = useSelector(getUser);

  const { logoutUser } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('player banned', bannedUserId => {
      if (user && user._id === bannedUserId) {
        dispatch(changeBanStatus('banned'));
        logoutUser('ban');
      }
    });

    return () => {
      socket.off('player banned');
    };
  }, [user, dispatch, logoutUser]);

  return (
    <div className="flex h-screen flex-col bg-gray-950">
      <Header />
      <main className="w-full text-white h-full flex-grow">
        {isLoading ? <Spinner /> : null}
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

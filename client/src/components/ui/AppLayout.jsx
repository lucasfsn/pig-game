import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getLoading } from '../user/userSlice.js';
import Header from './Header.jsx';
import Spinner from './Spinner.jsx';

function AppLayout() {
  const isLoading = useSelector(getLoading);

  return (
    <div className="flex min-h-screen flex-col bg-gray-950">
      <Header />
      <main className="w-full text-white h-full flex-grow">
        {isLoading ? <Spinner /> : null}
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

import { IoPerson, IoSettingsSharp } from 'react-icons/io5';
import { MdLeaderboard, MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAuth } from '../user/useAuth.js';
import Search from './Search.jsx';

function Header() {
  const { logoutUser } = useAuth();

  return (
    <div className="flex justify-between py-3 px-4 bg-gray-900 items-center shadow-md">
      <Link to="/">
        <img src="../../logo.png" alt="Pig Game" className="w-[50px]" />
      </Link>
      <Search />
      <div className="flex gap-2">
        <Link
          to="/leaderboard"
          className="text-gray-950 text-3xl rounded-full bg-white w-auto p-2"
        >
          <MdLeaderboard />
        </Link>
        <Link
          to="/profile"
          className="text-gray-950 text-3xl rounded-full bg-white w-auto p-2"
        >
          <IoPerson />
        </Link>
        <Link
          to="/settings"
          className="text-gray-950 text-3xl rounded-full bg-white w-auto p-2"
        >
          <IoSettingsSharp />
        </Link>
        <button
          className="text-gray-950 text-3xl rounded-full bg-white w-auto p-2"
          onClick={logoutUser}
        >
          <MdLogout />
        </button>
      </div>
    </div>
  );
}

export default Header;

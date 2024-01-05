import { IoPerson, IoSettingsSharp } from 'react-icons/io5';
import { MdLeaderboard, MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAuth } from '../user/useAuth.js';
import DarkModeToggle from './DarkModeToggle.jsx';
import Search from './Search.jsx';

function Header() {
  const { logoutUser } = useAuth();

  return (
    <div className="flex justify-between py-3 px-4 bg-gray-900 items-center shadow-md h-[60px]">
      <div className="flex items-center gap-4">
        <Link to="/">
          <img src="../../logo.png" alt="Pig Game" className="w-[50px]" />
        </Link>
        <Search />
      </div>
      <div className="flex gap-10 justify-between">
        <div className="flex gap-2">
          <Link
            to="/leaderboard"
            className="text-gray-950 text-3xl rounded-full bg-white w-auto p-2 hover:bg-gray-100 transition-colors duration-300"
          >
            <MdLeaderboard />
          </Link>
          <Link
            to="/profile"
            className="text-gray-950 text-3xl rounded-full bg-white w-auto p-2 hover:bg-gray-100 transition-colors duration-300"
          >
            <IoPerson />
          </Link>
        </div>
        <div className="flex gap-2">
          <DarkModeToggle />
          <Link
            to="/settings"
            className="text-gray-950 text-3xl rounded-full bg-white w-auto p-2 hover:bg-gray-100 transition-colors duration-300"
          >
            <IoSettingsSharp />
          </Link>
          <button
            className="text-gray-500 text-3xl rounded-full bg-pink-600 w-auto p-2 hover:bg-pink-700 transition-colors duration-300"
            onClick={() => logoutUser('logout')}
          >
            <MdLogout />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

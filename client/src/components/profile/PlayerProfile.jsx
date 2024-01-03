import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../ui/Spinner.jsx';
import { getUser } from '../user/userSlice.js';
import { getPlayer } from './apiProfile.js';

function PlayerProfile() {
  const [profile, setProfile] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  useEffect(() => {
    if (!username) navigate(`/profile/${user.username}`);
  }, [username, user, navigate]);

  useEffect(() => {
    if (!username) return;

    async function fetchProfile() {
      try {
        const { player } = await getPlayer(username);
        setProfile(player);
      } catch (err) {
        toast.error(
          err.response.data.message || 'An unexpected error occurred'
        );
      }
    }

    fetchProfile();
  }, [username]);

  if (!profile) return <Spinner />;

  return (
    <div className="flex w-full justify-center items-center p-10">
      <div className="flex flex-col p-8 bg-gray-900 rounded-lg shadow-lg gap-2 text-4xl">
        <p>
          Username: <span className="text-gray-400">{profile.username}</span>
        </p>
        <p>
          Games Played:{' '}
          <span className="text-gray-400">{profile.gamesPlayed}</span>
        </p>
        <p>
          Games Won: <span className="text-gray-400">{profile.gamesWon}</span>
        </p>
        <p>
          Games Lost:{' '}
          <span className="text-gray-400">
            {profile.gamesPlayed - profile.gamesWon}
          </span>
        </p>
      </div>
    </div>
  );
}

export default PlayerProfile;

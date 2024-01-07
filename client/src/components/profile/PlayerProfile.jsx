import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { mqttPublish } from '../../helpers/mqttPublish.js';
import Button from '../ui/Button.jsx';
import Spinner from '../ui/Spinner.jsx';
import { getUser } from '../user/userSlice.js';
import { banPlayerApi, getPlayerApi, unbanPlayerApi } from './apiProfile.js';

function PlayerProfile() {
  const [profile, setProfile] = useState(null);

  const { username } = useParams();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  useEffect(() => {
    if (!username) navigate(`/profile/${user.username}`);
  }, [username, user, navigate]);

  const fetchProfile = useCallback(async () => {
    try {
      const { player } = await getPlayerApi(username);
      setProfile(player);
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'An unexpected error occurred'
      );
    }
  }, [username]);

  useEffect(() => {
    if (!username) return;

    fetchProfile();
  }, [username, fetchProfile]);

  async function handleBan() {
    try {
      let banMessage;

      if (profile.status === 'banned') {
        const { message } = await unbanPlayerApi(profile._id);
        banMessage = message;
      } else if (profile.status === 'active') {
        const { message, games } = await banPlayerApi(profile._id);
        banMessage = message;

        games.forEach(game => {
          if (game.player2?._id === profile._id)
            mqttPublish(
              `game/${game._id}/leave`,
              JSON.stringify({
                updatedGame: {
                  ...game,
                  player2: null,
                },
                message: `${profile.username} has left the game`,
              })
            );
          else if (game.player1._id === profile._id)
            mqttPublish(
              `game/${game._id}/lobbyOwnerBan`,
              JSON.stringify({
                message: `${profile.username} has been banned from and the game has ended`,
                bannedPlayer: profile._id,
              })
            );
        });
      }

      toast.success(banMessage);

      mqttPublish(`player/${profile._id}/ban`, profile._id);

      fetchProfile();
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'An unexpected error occurred'
      );
    }
  }

  if (!profile) return <Spinner />;

  return (
    <div className="flex w-full p-10">
      <div className="flex flex-col p-8 bg-gray-900 rounded-lg shadow-lg gap-2 text-4xl w-full">
        <p>
          Username: <span className="text-blue-400">{profile.username}</span>
        </p>
        <p>
          Role: <span className="text-pink-800">{profile.role}</span>
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
        {user.role === 'admin' &&
          user.username !== profile.username &&
          profile.role !== 'admin' && (
            <>
              <Button
                textColor="text-red-100"
                bgColor="bg-pink-900"
                onClick={handleBan}
              >
                {profile.status === 'banned' ? 'Unban' : 'Ban'}{' '}
                {profile.username}
              </Button>
            </>
          )}
        {user.role !== 'admin' && user.username !== profile.username && (
          <span
            className={`rounded-full px-3 py-1 text-xl w-fit self-center ${
              profile.status === 'active'
                ? 'bg-green-600 text-black'
                : 'bg-red-600 text-white'
            }`}
          >
            {profile.status}
          </span>
        )}
      </div>
    </div>
  );
}

export default PlayerProfile;

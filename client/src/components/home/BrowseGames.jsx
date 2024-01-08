import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../game/useGame.js';
import Button from '../ui/Button.jsx';
import Loader from '../ui/Loader.jsx';
import { getUser } from '../user/userSlice.js';

function BrowseGames() {
  const [games, setGames] = useState(null);

  const { getGames, joinGame } = useGame();
  const user = useSelector(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGames() {
      const allGames = await getGames();

      setGames(allGames);
    }

    fetchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games]);

  async function handleJoinGame(gameId) {
    await joinGame(gameId, user);
  }

  function handleReturnToGame(gameId) {
    navigate(gameId);
  }

  return (
    <div className="flex flex-col gap-10 text-white">
      <p className="text-pink-600 text-center text-3xl font-semibold">
        Choose a lobby
      </p>
      {!games ? (
        <Loader />
      ) : (
        <ul className="text-2xl max-h-[500px] overflow-y-scroll flex flex-col gap-2">
          {games?.map(game => (
            <li
              key={game._id}
              className="flex gap-3 justify-between items-center"
            >
              <p>
                <span className="text-gray-400">
                  {game.player1.username}'s{' '}
                </span>
                lobby
              </p>
              {game.player1._id === user._id ||
              game.player2?._id === user._id ? (
                <Button
                  bgColor="bg-sky-600"
                  onClick={() => handleReturnToGame(game._id)}
                >
                  Rejoin
                </Button>
              ) : (
                <Button
                  bgColor="bg-pink-900"
                  onClick={() => handleJoinGame(game._id)}
                >
                  Join
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BrowseGames;

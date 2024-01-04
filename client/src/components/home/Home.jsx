import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGame } from '../game/useGame.js';
import Button from '../ui/Button.jsx';
import { getUser } from '../user/userSlice.js';

function Home() {
  const [gameId, setGameId] = useState('');

  const user = useSelector(getUser);

  const { createGame, joinGame } = useGame();

  async function handleCreateGame() {
    await createGame(user._id);
  }

  async function handleJoinGame() {
    await joinGame(gameId, user._id);
  }

  return (
    <div className="flex flex-col w-full gap-10 p-10 h-[calc(100dvh-60px)] justify-center">
      <div className="text-center p-5">
        <h2 className="text-4xl font-bold mb-4">
          Welcome <span className="text-gray-400">{user.username}</span> in{' '}
          <span className="text-pink-700">Pig Game</span>
        </h2>
        <div className="text-gray-300">
          <p className="text-xl mb-4">
            This is the ultimate place where the best players compete in the
            most exciting game of all time.
          </p>
          <p className="text-xl mb-4">
            Join the ranks of the top players, show your skills, and climb to
            the top of the{' '}
            <Link
              to="/leaderboard"
              className="text-pink-500 hover:text-pink-600"
            >
              leaderboard
            </Link>
            .
          </p>
          <p className="text-xl">Good luck and may the best player win!</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8">
        <Button bgColor="bg-pink-900" onClick={handleCreateGame}>
          Create New Game
        </Button>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter game ID"
            value={gameId}
            onChange={e => setGameId(e.target.value)}
            className="rounded-full bg-gray-900 px-4 py-2 text-lg transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-50 sm:w-64 sm:focus:w-72 lg:text-xl"
          />
          <Button
            bgColor="bg-gray-300"
            textColor="text-black"
            textSize="text-base md:text-lg"
            onClick={handleJoinGame}
          >
            Join Game
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../ui/Spinner.jsx';
import GameChat from './GameChat.jsx';
import GamePanel from './GamePanel.jsx';
import { getGameApi } from './apiGame.js';

function Game() {
  const [game, setGame] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    async function fetchGame() {
      const { game } = await getGameApi(id);
      setGame(game);
    }
    fetchGame();
  }, [id]);

  if (!game) return <Spinner />;

  return (
    <div className="w-full flex h-[calc(100dvh-60px)]">
      <GamePanel game={game} />
      <GameChat />
    </div>
  );
}

export default Game;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../../socket.js';
import Spinner from '../ui/Spinner.jsx';
import GameChat from './GameChat.jsx';
import GamePanel from './GamePanel.jsx';
import { useGame } from './useGame.js';

function Game() {
  const [game, setGame] = useState(null);

  const { id } = useParams();

  const { getGame, deleteGame } = useGame();

  useEffect(() => {
    async function fetchGame() {
      const game = await getGame(id);
      console.log(game);
      if (game) setGame(game);
    }
    fetchGame();
  }, [id]);

  useEffect(() => {
    socket.on('gameState', updatedGame => {
      if (updatedGame.score1 >= 100 || updatedGame.score2 >= 100) {
        deleteGame(updatedGame._id);
        return;
      }
      setGame(updatedGame);
    });

    return () => {
      socket.off('gameState');
    };
  }, []);

  if (!game) return <Spinner />;

  return (
    <div className="w-full flex h-[calc(100dvh-60px)]">
      <GamePanel game={game} />
      <GameChat />
    </div>
  );
}

export default Game;

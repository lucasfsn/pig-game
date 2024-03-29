import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useMqttSubscribe } from '../../hooks/useMqttSubscribe.js';
import Button from '../ui/Button.jsx';
import Spinner from '../ui/Spinner.jsx';
import { getUser } from '../user/userSlice.js';
import GameChat from './GameChat.jsx';
import GamePanel from './GamePanel.jsx';
import { useGame } from './useGame.js';

function Game() {
  const [game, setGame] = useState(null);

  const { id } = useParams();
  const { getGame, deleteGame, joinGame } = useGame();
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const [joinMessage, clearJoinMessage] = useMqttSubscribe(`game/${id}/join`);
  const [leaveMessage, clearLeaveMessage] = useMqttSubscribe(
    `game/${id}/leave`
  );
  const [rollMessage, clearRollMessage] = useMqttSubscribe(`game/${id}/roll`);
  const [holdMessage, clearHoldMessage] = useMqttSubscribe(`game/${id}/hold`);
  const [lobbyOwnerBanMessage, clearLobbyOwnerBanMessage] = useMqttSubscribe(
    `game/${id}/lobbyOwnerBan`
  );

  useEffect(() => {
    async function fetchGame() {
      const game = await getGame(id);
      if (game) setGame(game);
    }

    fetchGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!game) return;

    if (lobbyOwnerBanMessage) {
      const { message, bannedPlayer } = JSON.parse(lobbyOwnerBanMessage);

      if (bannedPlayer !== user._id) {
        toast(message, {
          icon: '❌',
        });

        navigate('/');
      }

      clearLobbyOwnerBanMessage();
    }

    if (joinMessage) {
      const { gameId, user } = JSON.parse(joinMessage);

      if (game._id === gameId) {
        setGame(prevGame => ({
          ...prevGame,
          player2: user,
        }));
      }

      clearJoinMessage();
    }

    if (leaveMessage) {
      const { updatedGame, message } = JSON.parse(leaveMessage);
      if (game._id === updatedGame._id) setGame(updatedGame);

      !message.includes(user.username) &&
        toast(message, {
          icon: '❌',
        });

      clearLeaveMessage();
    }

    if (rollMessage) {
      const { updatedGame } = JSON.parse(rollMessage);
      if (game._id === updatedGame._id) setGame(updatedGame);

      clearRollMessage();
    }

    if (holdMessage) {
      const { updatedGame } = JSON.parse(holdMessage);

      if (game._id !== updatedGame._id) return;

      if (updatedGame.score1 >= 100 || updatedGame.score2 >= 100)
        deleteGame(updatedGame._id);
      else setGame(updatedGame);

      clearHoldMessage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    joinMessage,
    rollMessage,
    holdMessage,
    leaveMessage,
    lobbyOwnerBanMessage,
    clearLobbyOwnerBanMessage,
    clearLeaveMessage,
    clearHoldMessage,
    clearRollMessage,
    clearJoinMessage,
    user._id,
    navigate,
  ]);

  async function handleJoinGame() {
    await joinGame(game._id, user);
  }

  if (!game) return <Spinner />;

  return (
    <div className="w-full flex h-[calc(100dvh-60px)] flex-col md:flex-row">
      {!game.player2 && game.player1._id !== user._id && (
        <div className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
          <Button
            bgColor="bg-pink-800"
            textColor="text-gray-200"
            textSize="text-2xl md:text-4xl"
            onClick={handleJoinGame}
          >
            Join Game
          </Button>
        </div>
      )}
      <GamePanel game={game} />
      <GameChat game={game} />
    </div>
  );
}

export default Game;

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { mqttPublish } from '../../helpers/mqttPublish.js';
import Button from '../ui/Button.jsx';
import { getUser } from '../user/userSlice.js';
import { useGame } from './useGame.js';

function GamePanel({ game }) {
  const [dice, setDice] = useState(game.diceNumber);

  const { updateGame, deleteGame, leaveGame } = useGame();
  const user = useSelector(getUser);

  useEffect(() => {
    setDice(game.diceNumber);
  }, [game.diceNumber]);

  async function handleRoll() {
    if (!game.player2) return;
    const newDice = Math.floor(Math.random() * 6) + 1;

    const nextPlayer =
      game.activePlayer === game.player1._id
        ? game.player2._id
        : game.player1._id;

    const updatedGame = {
      ...game,
      activePlayer: newDice === 1 ? nextPlayer : game.activePlayer,
      currentScore: newDice === 1 ? 0 : game.currentScore + newDice,
      diceNumber: newDice,
    };

    await updateGame(updatedGame);
    mqttPublish(`game/${game._id}/roll`, JSON.stringify({ updatedGame }));
  }

  async function handleHold() {
    if (!game.player2) return;

    const nextPlayer =
      game.activePlayer === game.player1._id
        ? game.player2._id
        : game.player1._id;

    const updatedGame = {
      ...game,
      activePlayer: nextPlayer,
      score1:
        game.activePlayer === game.player1._id
          ? game.score1 + game.currentScore
          : game.score1,
      score2:
        game.activePlayer === game.player2._id
          ? game.score2 + game.currentScore
          : game.score2,
      currentScore: 0,
    };

    await updateGame(updatedGame);
    mqttPublish(`game/${game._id}/hold`, JSON.stringify({ updatedGame }));
  }

  async function handleDeleteOrLeave() {
    if (game.player1._id === user._id && !game.player2) {
      await deleteGame(game._id, false);
    } else if (game.player2 && game.player2._id === user._id) {
      const updatedGame = await leaveGame(game._id);

      mqttPublish(
        `game/${game._id}/leave`,
        JSON.stringify({
          updatedGame,
          message: `${user.username} has left the game`,
        })
      );
    }
  }

  function deleteOrLeaveText() {
    if (game.player1._id === user._id) return 'Delete game';
    else if (game.player2?._id === user._id) return 'Leave game';
  }

  return (
    <div className="w-full md:w-3/4 flex justify-center items-center h-2/3 md:h-full">
      <div className="bg-gray-900 w-[95%] h-4/5 flex text-5xl relative max-h-[600px]">
        <div className="w-1/2 flex flex-col items-center justify-center gap-10">
          <p>
            {game.player1._id === user._id ? 'You' : game.player1.username}:{' '}
            {game.score1}
          </p>
          <p className="text-3xl">
            CURRENT:{' '}
            {game.player1._id === game.activePlayer ? game.currentScore : 0}
          </p>
        </div>
        <img
          src={`/dice/dice-${dice}.png`}
          alt={`Dice-${dice}`}
          className="h-[50px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        {(user._id === game.player1._id || user._id === game.player2?._id) && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2">
            <Button
              bgColor="bg-red-950"
              onClick={handleDeleteOrLeave}
              disabled={game.player1._id === user._id && game.player2}
            >
              {deleteOrLeaveText()}
            </Button>
          </div>
        )}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col gap-4">
          <Button
            bgColor="bg-pink-800"
            onClick={handleRoll}
            disabled={game.activePlayer !== user._id || !game.player2}
          >
            ROLL DICE
          </Button>
          <Button
            bgColor="bg-pink-800"
            onClick={handleHold}
            disabled={game.activePlayer !== user._id || !game.player2}
          >
            HOLD
          </Button>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center gap-4 bg-gray-700">
          {game.player2 ? (
            <>
              <p>
                {game.player2._id === user._id ? 'You' : game.player2.username}:{' '}
                {game.score2}
              </p>
              <p className="text-3xl">
                CURRENT:{' '}
                {game.player2._id === game.activePlayer ? game.currentScore : 0}
              </p>
            </>
          ) : (
            <p className="flex">
              Waiting <span className="loader"></span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GamePanel;

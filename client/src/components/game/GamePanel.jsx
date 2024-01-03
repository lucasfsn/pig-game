import { useState } from 'react';
import Button from '../ui/Button.jsx';

function GamePanel({ game }) {
  const [dice, setDice] = useState(1);

  return (
    <div className="w-3/4 flex justify-center items-center">
      <div className="bg-gray-900 w-[95%] h-[450px] flex text-5xl relative">
        <div className="w-1/2 flex flex-col items-center justify-center gap-10">
          <p>
            {game.player1.username}: {game.score1}
          </p>
          <p className="text-3xl">CURRENT: 5</p>
        </div>
        <img
          src={`/dice/dice-${dice}.png`}
          alt={`Dice-${dice}`}
          className="h-[50px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col gap-4">
          <Button bgColor="bg-pink-800">ROLL DICE</Button>
          <Button bgColor="bg-pink-800">HOLD</Button>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center gap-4 bg-gray-700">
          {game.player2 ? (
            <>
              <p>
                {game.player2.username}: {game.score1}
              </p>
              <p className="text-3xl">CURRENT: 5</p>
            </>
          ) : (
            <p>Waiting...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GamePanel;

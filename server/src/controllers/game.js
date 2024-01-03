import GameModel from '../models/game.js';

export const getGame = async (req, res) => {
  const { id } = req.params;

  try {
    const game = await GameModel.findById(id).populate(
      'player1 player2 winner'
    );

    if (!game) {
      throw createHttpError(404, 'Game not found');
    }

    res.send({
      game,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const createGame = async (req, res) => {
  try {
    const { playerId } = req.body;

    const game = new GameModel({ player1: playerId });
    const savedGame = await game.save();

    res.send({
      message: 'Game created successfully',
      game: savedGame,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const updateGame = async (req, res) => {
  const { id } = req.params;
  const { player1, player2, score1, score2, winner } = req.body;

  try {
    const game = await GameModel.findByIdAndUpdate(
      id,
      { player1, player2, score1, score2, winner },
      { new: true }
    );

    if (!game) {
      throw createHttpError(404, 'Game not found');
    }

    res.send({
      game,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const joinGame = async (req, res) => {
  const { id } = req.params;
  const { player } = req.body;

  try {
    const game = await GameModel.findById(id);

    if (!game) {
      throw createHttpError(404, 'Game not found');
    }

    game.player2 = player;
    await game.save();

    res.send({
      message: 'You have joined the game',
      game,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

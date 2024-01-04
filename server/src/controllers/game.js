import createHttpError from 'http-errors';
import { Types } from 'mongoose';
import GameModel from '../models/game.js';

export const getGame = async (req, res) => {
  const { id } = req.params;

  try {
    if (!Types.ObjectId.isValid(id))
      throw createHttpError(404, 'Game not found');

    const game = await GameModel.findById(id);

    if (!game) throw createHttpError(404, 'Game not found');

    const gameWithPlayersDetails = await game.populate(
      'player1 player2',
      '_id username'
    );

    res.send({
      game: gameWithPlayersDetails,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const createGame = async (req, res) => {
  try {
    const { playerId } = req.body;

    const game = new GameModel({ player1: playerId, activePlayer: playerId });
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
  const { game: updatedGame } = req.body;

  try {
    const game = await GameModel.findByIdAndUpdate(
      id,
      { ...updatedGame },
      { new: true }
    );

    if (!game) throw createHttpError(404, 'Game not found');

    res.send({
      game,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const joinGame = async (req, res) => {
  const { id } = req.params;
  const { playerId } = req.body;

  try {
    const game = await GameModel.findById(id);

    if (!game) throw createHttpError(404, 'Game not found');

    if (game.player2) throw createHttpError(400, 'Game is full');

    game.player2 = playerId;
    await game.save();

    res.send({
      message: 'You have joined the game',
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const deleteGame = async (req, res) => {
  const { id } = req.params;

  try {
    const game = await GameModel.findById(id).populate('player1 player2');

    if (!game) throw createHttpError(404, 'Game not found');

    const winner =
      game.score1 >= 100 ? game.player1.username : game.player2.username;

    await GameModel.findByIdAndDelete(id);

    res.send({
      message: `Game has ended and the winner is ${winner}`,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

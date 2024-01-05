import createHttpError from 'http-errors';
import { Types } from 'mongoose';
import GameModel from '../models/game.js';
import MessageModel from '../models/message.js';
import PlayerModel from '../models/player.js';

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

    const player1 = await PlayerModel.findById(game.player1);
    const player2 = await PlayerModel.findById(game.player2);

    if (game.score1 >= 100) {
      await PlayerModel.findByIdAndUpdate(player1._id, {
        gamesPlayed: player1.gamesPlayed + 1,
        gamesWon: player1.gamesWon + 1,
      });
      await PlayerModel.findByIdAndUpdate(player2._id, {
        gamesPlayed: player2.gamesPlayed + 1,
      });
    } else if (game.score2 >= 100) {
      await PlayerModel.findByIdAndUpdate(player1._id, {
        gamesPlayed: player1.gamesPlayed + 1,
      });
      await PlayerModel.findByIdAndUpdate(player2._id, {
        gamesPlayed: player2.gamesPlayed + 1,
        gamesWon: player2.gamesWon + 1,
      });
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

    await MessageModel.deleteMany({ game: id });

    await GameModel.findByIdAndDelete(id);

    res.send({
      message: `Game has ended and the winner is ${winner}`,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

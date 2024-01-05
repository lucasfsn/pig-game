import createHttpError from 'http-errors';
import MessageModel from '../models/message.js';

export const getMessages = async (req, res) => {
  try {
    const { gameId } = req.params;

    const messages = await MessageModel.find({ game: gameId })
      .sort({
        timestamp: 1,
      })
      .populate('player', 'username');

    res.send({
      messages: messages,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const addMessage = async (req, res) => {
  try {
    const { gameId, playerId } = req.params;
    const { message } = req.body;

    await MessageModel.create({
      game: gameId,
      player: playerId,
      text: message,
    });

    res.send({
      status: 'ok',
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { gameId, messageId } = req.params;

    const deletedMessage = await MessageModel.findOneAndDelete({
      _id: messageId,
      game: gameId,
    });

    if (!deletedMessage) throw createHttpError(404, 'Message not found');

    res.send({
      status: 'ok',
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

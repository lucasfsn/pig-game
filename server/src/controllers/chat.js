import ChatModel from '../models/chat.js';

export const getChatHistory = async (req, res) => {
  try {
    const { gameId } = req.params;
    const chatHistory = await ChatModel.find({ game: gameId }).sort({
      timestamp: -1,
    });
    if (!chatHistory) {
      res.status(404).json({ message: 'No chat history found for this game' });
    } else {
      res.send(chatHistory);
    }
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

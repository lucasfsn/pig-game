import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  addMessageApi,
  createGameApi,
  deleteGameApi,
  deleteMessageApi,
  getGameApi,
  getMessagesApi,
  joinGameApi,
  leaveGameApi,
  updateGameApi,
} from './apiGame.js';

export function useGame() {
  const navigate = useNavigate();

  async function getGame(id) {
    try {
      const { game } = await getGameApi(id);

      return game;
    } catch (err) {
      navigate('/', { replace: true });
      toast.error(
        err.response?.data?.message || 'An unexpected error occurred'
      );
    }
  }

  async function createGame(id) {
    try {
      const { message, game } = await createGameApi(id);

      toast.success(message);

      navigate(`/${game._id}`);
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'An unexpected error occurred'
      );
    }
  }

  async function joinGame(gameId, playerId) {
    try {
      const { message } = await joinGameApi(gameId, playerId);

      toast.success(message);

      navigate(`/${gameId}`);
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'An unexpected error occurred'
      );
    }
  }

  async function updateGame(game) {
    try {
      await updateGameApi(game);
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'An unexpected error occurred'
      );
    }
  }

  async function deleteGame(gameId, winnerChosen = true) {
    try {
      const { message } = await deleteGameApi(gameId);

      winnerChosen
        ? toast(message, {
            icon: '🥇',
          })
        : toast('Game has been deleted', {
            icon: '🗑️',
          });

      navigate('/', { replace: true });
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'An unexpected error occurred'
      );
    }
  }

  async function leaveGame(gameId) {
    try {
      const { message, game } = await leaveGameApi(gameId);

      toast.success(message);

      navigate('/', { replace: true });

      return game;
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'An unexpected error occurred'
      );
    }
  }

  async function getMessages(gameId) {
    try {
      const { messages } = await getMessagesApi(gameId);

      return messages;
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'An unexpected error occurred'
      );
    }
  }

  async function addMessage(gameId, playerId, message) {
    try {
      await addMessageApi(gameId, playerId, message);
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'An unexpected error occurred'
      );
    }
  }

  async function deleteMessage(gameId, messageId) {
    try {
      await deleteMessageApi(gameId, messageId);
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'An unexpected error occurred'
      );
    }
  }

  return {
    getGame,
    createGame,
    joinGame,
    updateGame,
    deleteGame,
    leaveGame,
    addMessage,
    deleteMessage,
    getMessages,
  };
}

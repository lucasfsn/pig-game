import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  createGameApi,
  deleteGameApi,
  getGameApi,
  joinGameApi,
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

  async function deleteGame(gameId, playerId) {
    try {
      const { message } = await deleteGameApi(gameId);
      console.log('jd');

      toast(message, {
        icon: '🥇',
      });

      navigate('/', { replace: true });
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'An unexpected error occurred'
      );
    }
  }

  return { getGame, createGame, joinGame, updateGame, deleteGame };
}

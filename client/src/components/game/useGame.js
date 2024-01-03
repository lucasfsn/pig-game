import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { createGameApi } from './apiGame.js';

export function useGame() {
  const navigate = useNavigate();

  async function createGame(id) {
    try {
      const { message, game } = await createGameApi(id);

      toast.success(message);

      navigate(`/${game._id}`);
    } catch (err) {
      toast.error(err.response.data.message || 'An unexpected error occurred');
    }
  }

  return { createGame };
}

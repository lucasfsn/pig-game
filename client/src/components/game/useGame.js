import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { mqttPublish } from '../../helpers/mqttPublish.js';
import {
  addMessageApi,
  createGameApi,
  deleteGameApi,
  deleteMessageApi,
  getGameApi,
  getGamesApi,
  getMessagesApi,
  joinGameApi,
  leaveGameApi,
  updateGameApi,
} from './apiGame.js';

export function useGame() {
  const navigate = useNavigate();

  async function getGames() {
    try {
      const { games } = await getGamesApi();

      return games;
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'An unexpected error occurred'
      );
    }
  }

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

      toast.custom(t => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-gray-950 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="ml-3 flex-1">
              <p className="text-lg md:text-xl font-medium text-white">
                {message}
              </p>
              <p className="mt-2 text-base md:text-lg text-gray-400">
                Invite your friends to join the game by sharing the game id
              </p>
              <p className="mt-1 text-base text-pink-900">{game._id}</p>
            </div>
          </div>
          <div className="flex border-l border-gray-800">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-pink-800 hover:text-pink-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));

      navigate(`/${game._id}`);
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'An unexpected error occurred'
      );
    }
  }

  async function joinGame(gameId, user) {
    try {
      const { message } = await joinGameApi(gameId, user._id);

      mqttPublish(`game/${gameId}/join`, JSON.stringify({ gameId, user }));

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
    getGames,
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

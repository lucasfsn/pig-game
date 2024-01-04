import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export async function createGameApi(playerId) {
  const { data } = await axios.post(`${apiUrl}/game`, {
    playerId,
  });

  return data;
}

export async function joinGameApi(gameId, playerId) {
  const { data } = await axios.post(`${apiUrl}/game/${gameId}`, {
    playerId,
  });

  return data;
}

export async function getGameApi(id) {
  const { data } = await axios.get(`${apiUrl}/game/${id}`);

  return data;
}

export async function updateGameApi(game) {
  const { data } = await axios.put(`${apiUrl}/game/${game._id}`, {
    game,
  });

  return data;
}

export async function deleteGameApi(gameId) {
  const { data } = await axios.delete(`${apiUrl}/game/${gameId}`);

  return data;
}

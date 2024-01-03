import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export async function createGameApi(playerId) {
  const { data } = await axios.post(`${apiUrl}/game`, {
    playerId,
  });

  return data;
}

export async function getGameApi(id) {
  const { data } = await axios.get(`${apiUrl}/game/${id}`);

  return data;
}

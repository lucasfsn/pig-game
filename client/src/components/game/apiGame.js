import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export async function createGameApi(playerId) {
  const token = Cookies.get('token');

  const { data } = await axios.post(
    `${apiUrl}/game`,
    {
      playerId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

export async function getGamesApi() {
  const token = Cookies.get('token');

  const { data } = await axios.get(`${apiUrl}/game/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function joinGameApi(gameId, playerId) {
  const token = Cookies.get('token');

  const { data } = await axios.post(
    `${apiUrl}/game/${gameId}`,
    {
      playerId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

export async function getGameApi(id) {
  const token = Cookies.get('token');

  const { data } = await axios.get(`${apiUrl}/game/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function updateGameApi(game) {
  const token = Cookies.get('token');

  const { data } = await axios.put(
    `${apiUrl}/game/${game._id}`,
    {
      game,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

export async function deleteGameApi(gameId) {
  const token = Cookies.get('token');

  const { data } = await axios.delete(`${apiUrl}/game/${gameId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function leaveGameApi(gameId) {
  const token = Cookies.get('token');

  const { data } = await axios.put(
    `${apiUrl}/game/leave/${gameId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

export async function getMessagesApi(gameId) {
  const token = Cookies.get('token');

  const { data } = await axios.get(`${apiUrl}/message/${gameId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function addMessageApi(gameId, playerId, message) {
  const token = Cookies.get('token');

  const { data } = await axios.post(
    `${apiUrl}/message/${gameId}/${playerId}`,
    {
      message,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

export async function deleteMessageApi(gameId, messageId) {
  const token = Cookies.get('token');

  const { data } = await axios.delete(
    `${apiUrl}/message/${gameId}/${messageId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

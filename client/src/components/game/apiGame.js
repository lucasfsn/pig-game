import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

const token = Cookies.get('token');

export async function createGameApi(playerId) {
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

export async function joinGameApi(gameId, playerId) {
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
  const { data } = await axios.get(`${apiUrl}/game/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function updateGameApi(game) {
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
  const { data } = await axios.delete(`${apiUrl}/game/${gameId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function leaveGameApi(gameId) {
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
  const { data } = await axios.get(`${apiUrl}/message/${gameId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function addMessageApi(gameId, playerId, message) {
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

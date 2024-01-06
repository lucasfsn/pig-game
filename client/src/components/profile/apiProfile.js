import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export async function searchApi(username) {
  const token = Cookies.get('token');

  const { data } = await axios.get(`${apiUrl}/search?username=${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getPlayerApi(username) {
  const token = Cookies.get('token');

  const { data } = await axios.get(`${apiUrl}/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function banPlayerApi(id) {
  const token = Cookies.get('token');

  const { data } = await axios.put(
    `${apiUrl}/ban/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

export async function unbanPlayerApi(id) {
  const token = Cookies.get('token');

  const { data } = await axios.put(
    `${apiUrl}/unban/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

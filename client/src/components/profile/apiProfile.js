import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export async function searchApi(username) {
  const { data } = await axios.get(`${apiUrl}/search?username=${username}`);

  return data;
}

export async function getPlayerApi(username) {
  const { data } = await axios.get(`${apiUrl}/${username}`);

  return data;
}

export async function banPlayerApi(id) {
  const { data } = await axios.put(`${apiUrl}/ban/${id}`);

  return data;
}

export async function unbanPlayerApi(id) {
  const { data } = await axios.put(`${apiUrl}/unban/${id}`);

  return data;
}

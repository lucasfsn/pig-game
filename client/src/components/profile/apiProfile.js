import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export async function search(username) {
  const { data } = await axios.get(`${apiUrl}/search?username=${username}`);

  return data;
}

export async function getPlayer(username) {
  const { data } = await axios.get(`${apiUrl}/${username}`);

  return data;
}

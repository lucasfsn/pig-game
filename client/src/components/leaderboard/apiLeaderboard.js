import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export async function getLeaderboard(field, order) {
  const { data } = await axios.get(
    `${apiUrl}/leaderboard?sort=${field}&order=${order}`
  );

  return data;
}

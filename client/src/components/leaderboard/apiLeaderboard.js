import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

const token = Cookies.get('token');

export async function getLeaderboard(field, order) {
  const { data } = await axios.get(
    `${apiUrl}/leaderboard?sort=${field}&order=${order}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

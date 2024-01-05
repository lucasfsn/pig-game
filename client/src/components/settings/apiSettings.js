import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;
const token = Cookies.get('token');

export async function changeUsernameApi(username, id) {
  const { data } = await axios.put(
    `${apiUrl}/change-username/${id}`,
    {
      username,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

export async function changePasswordApi(password, id) {
  const { data } = await axios.put(
    `${apiUrl}/change-password/${id}`,
    {
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

export async function deleteAccountApi(id) {
  const { data } = await axios.delete(`${apiUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function changeRoleApi(username, role) {
  const { data } = await axios.put(
    `${apiUrl}/change-role/${username}`,
    {
      role,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

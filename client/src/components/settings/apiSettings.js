import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export async function changeUsernameApi(username, id) {
  const { data } = await axios.put(`${apiUrl}/change-username/${id}`, {
    username,
  });

  return data;
}

export async function changePasswordApi(password, id) {
  const { data } = await axios.put(`${apiUrl}/change-password/${id}`, {
    password,
  });

  return data;
}

export async function deleteAccountApi(id) {
  const { data } = await axios.delete(`${apiUrl}/${id}`);

  return data;
}

export async function changeRoleApi(username, role) {
  const { data } = await axios.put(`${apiUrl}/change-role/${username}`, {
    role,
  });

  return data;
}

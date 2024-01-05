import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export async function signupApi(user) {
  const { data } = await axios.post(`${apiUrl}/signup`, user);

  return data;
}

export async function loginApi(user) {
  const { data } = await axios.post(`${apiUrl}/login`, user);

  return data;
}

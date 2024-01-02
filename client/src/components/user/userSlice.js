import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  isLoading: false,
  error: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    logout() {
      return initialState;
    },
    fetching(state) {
      state.isLoading = true;
      state.error = false;
    },
    error(state) {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const { login, logout, fetching, error } = userSlice.actions;

export default userSlice.reducer;

export const getUser = state => state.user?.user;

export const getLoading = state => state.user?.isLoading;

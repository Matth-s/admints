import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface userState {
  token: string;
  isAuthenticated: boolean | null;
}

const initialState: userState = {
  token: '',
  isAuthenticated: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setToken, setIsAuthenticated } = UserSlice.actions;

export default UserSlice.reducer;

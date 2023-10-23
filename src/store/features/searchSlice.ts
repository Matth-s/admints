import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface searchState {
  searchMaterial: string;
  searchBooking: string;
  searchChoice: string;
}

const initialState: searchState = {
  searchMaterial: '',
  searchBooking: '',
  searchChoice: '',
};

export const SearchSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSearchMaterial: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.searchMaterial = payload;
    },
    setSearchBooking: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.searchBooking = payload;
    },
    setSearchChoice: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.searchChoice = payload;
    },
  },
});

export const {
  setSearchMaterial,
  setSearchChoice,
  setSearchBooking,
} = SearchSlice.actions;

export default SearchSlice.reducer;

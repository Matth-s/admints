import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Booking } from '../../schema/booking-schema';

interface bookingState {
  booking: Booking[];
  viewBooking: Booking | null;
  createBooking: Booking | null;
}

const initialState: bookingState = {
  booking: [],
  viewBooking: null,
  createBooking: null,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBooking: (state, action: PayloadAction<Booking[]>) => {
      const { payload } = action;
      state.booking = payload;
    },
    setCreateBooking: (state, action: PayloadAction<Booking>) => {
      const { payload } = action;
      state.createBooking = payload;
    },
  },
});

export const { setBooking, setCreateBooking } = bookingSlice.actions;

export default bookingSlice.reducer;

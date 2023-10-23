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
    addBooking: (state, action: PayloadAction<Booking>) => {
      const { payload } = action;
      state.viewBooking = payload;
      state.booking.push(payload);
    },
    setCreateBooking: (state, action: PayloadAction<Booking>) => {
      const { payload } = action;
      state.createBooking = payload;
    },
    setViewBooking: (state, action: PayloadAction<Booking>) => {
      const { payload } = action;
      state.viewBooking = payload;
    },
    deleteBooking: (state, action: PayloadAction<string>) => {
      const { payload } = action;

      state.viewBooking = null;

      const upDateBooking = state.booking.filter(
        (item) => item.id !== payload
      );

      state.booking = upDateBooking;
    },
    setUnavailableDates: (
      state,
      action: PayloadAction<string[] | []>
    ) => {
      const { payload } = action;

      if (state.viewBooking) {
        const updatedViewBooking = {
          ...state.viewBooking,
          unavailableDates: payload,
        };

        state.viewBooking = updatedViewBooking;
      }
    },
    setUpdateBooking: (state, action: PayloadAction<Booking>) => {
      const { payload } = action;
      console.log(payload);
      state.viewBooking = payload;

      const newMaterial = state.booking.map((item) => {
        if (item.id === payload.id) {
          return (item = payload);
        } else {
          return item;
        }
      });

      state.booking = newMaterial;
    },
  },
});

export const {
  setBooking,
  setCreateBooking,
  setViewBooking,
  addBooking,
  deleteBooking,
  setUnavailableDates,
  setUpdateBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;

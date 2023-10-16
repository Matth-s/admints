import { Booking } from '../schema/booking-schema';

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setBooking } from '../store/features/bookingSlice';

const urlLocal = 'http://localhost:3000/api';

export const getAllBookingService = createAsyncThunk(
  'getBooking',
  async ({ token }: { token: string }, { dispatch }) => {
    try {
      const { data, status } = await axios.get<Booking[] | []>(
        `${urlLocal}/booking`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(setBooking(data));

      return status;
    } catch (error) {
      throw error;
    }
  }
);

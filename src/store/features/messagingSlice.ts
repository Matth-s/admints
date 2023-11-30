import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Booking } from '../../schema/booking-schema';

interface MessagingState {
  message: Booking[] | [];
  viewMessage: Booking | null;
}

const initialState: MessagingState = {
  message: [],
  viewMessage: null,
};

export const MessagingSlice = createSlice({
  name: 'messaging',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<Booking[] | []>) => {
      const { payload } = action;
      state.message = payload;
    },
  },
});

export const { setMessage } = MessagingSlice.actions;
export default MessagingSlice.reducer;

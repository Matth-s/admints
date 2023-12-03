import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../schema/message';
import { Booking } from '../../schema/booking-schema';

interface MessagingState {
  message: Message[] | [];
  viewMessage: Message | null;
}

const initialState: MessagingState = {
  message: [],
  viewMessage: null,
};

export const MessagingSlice = createSlice({
  name: 'messaging',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<Message[] | []>) => {
      const { payload } = action;
      state.message = payload;
    },
    setViewMessage: (state, action: PayloadAction<Message>) => {
      const { payload } = action;

      state.viewMessage = payload;
    },
    setDeleteMessage: (state, action: PayloadAction<string>) => {
      const { payload } = action;

      const filtredMessage = state.message.filter(
        (message) => message.id !== payload
      );

      state.viewMessage = null;
      state.message = filtredMessage;
    },
    setChangeStatusMessage: (
      state,
      action: PayloadAction<string>
    ) => {
      const id = action.payload;

      if (state.viewMessage) {
        const updateViewMaterial = {
          ...state.viewMessage,
          isRead: !state.viewMessage.isRead,
        };

        const filtredMessage = state.message.filter(
          (message) => message.id !== id
        );

        state.message = [...filtredMessage, updateViewMaterial];
        state.viewMessage = updateViewMaterial;
      }
    },
  },
});

export const {
  setMessage,
  setViewMessage,
  setDeleteMessage,
  setChangeStatusMessage,
} = MessagingSlice.actions;
export default MessagingSlice.reducer;

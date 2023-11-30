import { configureStore } from '@reduxjs/toolkit';

import MaterialSlice from './features/materialSlice';
import userSlice from './features/userSlice';
import bookingSlice from './features/bookingSlice';
import searchSlice from './features/searchSlice';
import messagingSlice from './features/messagingSlice';

import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

export const store = configureStore({
  reducer: {
    MaterialSlice,
    userSlice,
    bookingSlice,
    searchSlice,
    messagingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch =
  useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';

import { auth } from '../firebaseConf';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { userAuth } from '../schema/user-schema';

import {
  setIsAuthenticated,
  setToken,
} from '../store/features/userSlice';
import { setBooking } from '../store/features/bookingSlice';

export const signUpService = createAsyncThunk(
  'signUp',
  async ({ dataUser }: { dataUser: userAuth }, { dispatch }) => {
    const { email, password } = dataUser;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = <any>userCredential;
      const { accessToken } = user;

      dispatch(setToken(accessToken));
      dispatch(setIsAuthenticated(true));

      return 200;
    } catch (error) {
      throw error;
    }
  }
);

export const checkUserStatusService = createAsyncThunk(
  'checkUserStatus',
  async (_, { dispatch }) => {
    try {
      const auth = getAuth();

      return new Promise<void>((resolve) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const { accessToken } = <any>user;
            dispatch(setIsAuthenticated(true));
            dispatch(setToken(accessToken));
            resolve();
          } else {
            dispatch(setIsAuthenticated(false));
            dispatch(setToken(''));
            resolve();
          }
        });
      });
    } catch (error) {
      return error;
    }
  }
);

export const logOutService = createAsyncThunk(
  'logout',
  async (_, { dispatch }) => {
    try {
      await auth.signOut();

      dispatch(setToken(''));
      dispatch(setIsAuthenticated(false));
      dispatch(setBooking([]));
    } catch (error) {
      return error;
    }
  }
);

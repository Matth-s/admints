import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getToken } from 'firebase/app-check';
import { appCheck } from '../firebaseConf';
import { setMessage } from '../store/features/messagingSlice';

const urlLocal = 'http://localhost:3000/api';

export const getAllMessagingService = createAsyncThunk(
  'getMessaging',
  async ({ token }: { token: string }, { dispatch }) => {
    try {
      const tokenApp = (await getToken(appCheck)).token;
      const { data, status } = await axios.get<any>(
        `${urlLocal}/messaging`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-firebase-appcheck': `${tokenApp}`,
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(setMessage(data));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

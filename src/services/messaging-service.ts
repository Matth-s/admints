import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getToken } from 'firebase/app-check';
import { appCheck } from '../firebaseConf';
import {
  setChangeStatusMessage,
  setDeleteMessage,
  setMessage,
  setViewMessage,
} from '../store/features/messagingSlice';
import { Message } from '../schema/message';
import { Booking } from '../schema/booking-schema';
import { addBooking } from '../store/features/bookingSlice';

const urlLocal = 'https://backendlocation.onrender.com/api';

export const createBookingFromMessage = createAsyncThunk(
  'createReservation',
  async (
    { token, message }: { token: string; message: Booking },
    { dispatch }
  ) => {
    try {
      const tokenApp = (await getToken(appCheck)).token;

      await axios.post(`${urlLocal}/messaging/create`, message, {
        headers: {
          Authorization: `Bearer ${token}`,
          'x-firebase-appcheck': `${tokenApp}`,
          'Content-Type': 'application/json',
        },
      });

      dispatch(setDeleteMessage(message.id));
      dispatch(addBooking(message));
    } catch (error) {
      throw error;
    }
  }
);

export const getAllMessagingService = createAsyncThunk(
  'getMessaging',
  async ({ token }: { token: string }, { dispatch }) => {
    try {
      const tokenApp = (await getToken(appCheck)).token;
      const { data } = await axios.get<any>(`${urlLocal}/messaging`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'x-firebase-appcheck': `${tokenApp}`,
          'Content-Type': 'application/json',
        },
      });

      dispatch(setMessage(data));
    } catch (error) {
      throw error;
    }
  }
);

export const getMessage = createAsyncThunk(
  'getMessage',
  async (
    { id, token }: { id: string; token: string },
    { dispatch }
  ) => {
    try {
      const tokenApp = (await getToken(appCheck)).token;

      const { data } = await axios.get(
        `${urlLocal}/messaging/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-firebase-appcheck': `${tokenApp}`,
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(setViewMessage(data));
    } catch (error) {
      throw error;
    }
  }
);

export const deleteMessage = createAsyncThunk(
  'deleteMessage',
  async (
    { token, id }: { token: string; id: string },
    { dispatch }
  ) => {
    try {
      const tokenApp = (await getToken(appCheck)).token;

      await axios.delete(`${urlLocal}/messaging/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'x-firebase-appcheck': `${tokenApp}`,
          'Content-Type': 'application/json',
        },
      });

      dispatch(setDeleteMessage(id));
    } catch (error) {
      throw error;
    }
  }
);

export const changeViewOfMessage = createAsyncThunk(
  'changeViewOfMessage',
  async (
    { id, token }: { id: string; token: string },
    { dispatch }
  ) => {
    try {
      const tokenApp = (await getToken(appCheck)).token;

      await axios.put<Message>(
        `${urlLocal}/messaging/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-firebase-appcheck': `${tokenApp}`,
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch(setChangeStatusMessage(id));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

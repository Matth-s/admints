import { Booking } from '../schema/booking-schema';

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  addBooking,
  deleteBooking,
  setBooking,
  setMarkAsPaid,
  setUnavailableDates,
  setUpdateBooking,
  setViewBooking,
} from '../store/features/bookingSlice';
import {
  setAddBookingDate,
  setDeleteDates,
  setUpdateMaterial,
} from '../store/features/materialSlice';
import { getToken } from 'firebase/app-check';

import { appCheck } from '../firebaseConf';

import { Material } from '../schema/material-schema';

const urlLocal = 'https://backendlocation.onrender.com/api';

export const getAllBookingService = createAsyncThunk(
  'getBooking',
  async ({ token }: { token: string }, { dispatch }) => {
    try {
      const tokenApp = (await getToken(appCheck)).token;
      const { data, status } = await axios.get<Booking[] | []>(
        `${urlLocal}/booking`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-firebase-appcheck': `${tokenApp}`,
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
export const getBookingById = createAsyncThunk(
  'getBookingById',
  async (
    { id, token }: { id: string; token: string },
    { dispatch }
  ) => {
    try {
      const tokenApp = (await getToken(appCheck)).token;
      const { data } = await axios.get<Booking>(
        `${urlLocal}/booking/${id}`,
        {
          headers: {
            'x-firebase-appcheck': `${tokenApp}`,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setViewBooking(data));
    } catch (error) {
      throw error;
    }
  }
);

export const createBookingService = createAsyncThunk(
  'createBooking',
  async (
    { booking, token }: { booking: Booking; token: string },
    { dispatch }
  ) => {
    try {
      const tokenApp = (await getToken(appCheck)).token;
      const { data, status } = await axios.post<Booking>(
        `${urlLocal}/booking`,
        booking,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-firebase-appcheck': `${tokenApp}`,
          },
        }
      );

      dispatch(
        setAddBookingDate({
          id: data.idMaterial,
          dates: data.bookingDates,
        })
      );
      dispatch(addBooking(data));

      return status;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteBookingByIdService = createAsyncThunk(
  'deleteBooking',
  async (
    { id, token }: { id: string; token: string },
    { dispatch }
  ) => {
    try {
      const tokenApp = (await getToken(appCheck)).token;
      const { data, status } = await axios.delete<Material>(
        `${urlLocal}/booking/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-firebase-appcheck': `${tokenApp}`,
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(setDeleteDates(data));
      dispatch(deleteBooking(id));

      return status;
    } catch (error) {
      throw error;
    }
  }
);

export const getUnavailableDatesService = createAsyncThunk(
  'getUnavailableDates',
  async (
    { id, token }: { id: string; token: string },
    { dispatch }
  ) => {
    try {
      const tokenApp = (await getToken(appCheck)).token;
      const { data } = await axios.get<string[] | []>(
        `${urlLocal}/booking/unavailableDates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-firebase-appcheck': `${tokenApp}`,
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(setUnavailableDates(data));
    } catch (error) {
      throw error;
    }
  }
);

export const updateBookingService = createAsyncThunk(
  'update booking',
  async (
    { token, booking }: { token: string; booking: Booking },
    { dispatch }
  ) => {
    try {
      const tokenApp = (await getToken(appCheck)).token;
      const { data, status } = await axios.put<{
        bookingRes: Booking;
        materialRes: Material;
      }>(`${urlLocal}/booking/${booking.id}`, booking, {
        headers: {
          Authorization: `Bearer ${token}`,
          'x-firebase-appcheck': `${tokenApp}`,
          'Content-Type': 'application/json',
        },
      });

      const { bookingRes, materialRes } = data;

      dispatch(setUpdateMaterial(materialRes));
      dispatch(setUpdateBooking(bookingRes));

      return status;
    } catch (error) {
      throw error;
    }
  }
);

export const markAsPaidService = createAsyncThunk(
  'markaspaid',
  async (
    { id, token }: { id: string; token: string },
    { dispatch }
  ) => {
    try {
      const tokenApp = (await getToken(appCheck)).token;
      const { status } = await axios.put<null>(
        `${urlLocal}/booking/markAsPaid/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-firebase-appcheck': `${tokenApp}`,
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(setMarkAsPaid(id));

      return status;
    } catch (error) {
      throw error;
    }
  }
);

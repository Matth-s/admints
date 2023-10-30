import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { Material } from '../schema/material-schema';
import {
  addMaterial,
  setDeleteMaterial,
  setMaterial,
  setUpdateMaterial,
  setViewMaterial,
} from '../store/features/materialSlice';

import { getToken } from 'firebase/app-check';

import { appCheck } from '../firebaseConf';

const urlLocal = 'https://backendlocation.onrender.com';

export const getAllMaterialService = createAsyncThunk(
  'getAllMaterial',
  async (_, { dispatch }) => {
    try {
      const tokenApp = (await getToken(appCheck)).token;
      const { data, status } = await axios.get<Material[]>(
        `${urlLocal}/material`,
        {
          headers: {
            ' x-firebase-appcheck': `${tokenApp}`,
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(setMaterial(data));
      return status;
    } catch (error) {
      throw error;
    }
  }
);

export const getMaterialByIdService = createAsyncThunk(
  'getMaterialById',
  async ({ id }: { id: string }, { dispatch }) => {
    try {
      const tokenApp = (await getToken(appCheck)).token;
      const { data } = await axios.get<Material>(
        `${urlLocal}/material/${id}`,
        {
          headers: {
            ' x-firebase-appcheck': `${tokenApp}`,
          },
        }
      );

      dispatch(setViewMaterial(data));
    } catch (error) {
      throw error;
    }
  }
);

export const updateMaterialService = createAsyncThunk(
  'updateMaterial',
  async (
    {
      material,
      token,
      id,
    }: { material: Material; token: string; id: string },
    { dispatch }
  ) => {
    try {
      const tokenApp = (await getToken(appCheck)).token;
      const { data, status } = await axios.put<Material>(
        `${urlLocal}/material/${id}`,
        material,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-firebase-appcheck': `${tokenApp}`,
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(setUpdateMaterial(data));

      return status;
    } catch (error) {
      throw error;
    }
  }
);

export const createMaterialService = createAsyncThunk(
  'createMaterial',
  async (
    { material, token }: { material: Material; token: string },
    { dispatch }
  ) => {
    try {
      const tokenApp = (await getToken(appCheck)).token;
      const { data, status } = await axios.post<Material>(
        `${urlLocal}/material`,
        material,
        {
          headers: {
            'x-firebase-appcheck': `${tokenApp}`,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(addMaterial(data));
      dispatch(setViewMaterial(data));
      return { status: status, idMaterial: data.id };
    } catch (error) {
      throw error;
    }
  }
);

export const deleteMaterielByIdService = createAsyncThunk(
  'deleteMaterial',
  async (
    { id, token }: { id: string; token: string },
    { dispatch }
  ) => {
    try {
      const tokenApp = (await getToken(appCheck)).token;
      const { status } = await axios.delete(
        `${urlLocal}/material/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-firebase-appcheck': `${tokenApp}`,
          },
        }
      );

      dispatch(setDeleteMaterial(id));

      return status;
    } catch (error) {
      throw error;
    }
  }
);

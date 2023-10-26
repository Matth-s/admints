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

import { tokenApp } from '../firebaseConf';

const urlLocal = 'http://localhost:3000/api';

export const getAllMaterialService = createAsyncThunk(
  'getAllMaterial',
  async (_, { dispatch }) => {
    try {
      const { data, status } = await axios.get<Material[]>(
        `${urlLocal}/material`,
        {
          headers: {
            'X-Firebase-AppCheck': tokenApp,
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
      const { data } = await axios.get<Material>(
        `${urlLocal}/material/${id}`
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
      const { data, status } = await axios.put<Material>(
        `${urlLocal}/material/${id}`,
        material,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      const { data, status } = await axios.post<Material>(
        `${urlLocal}/material`,
        material,
        {
          headers: {
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
      const { status } = await axios.delete(
        `${urlLocal}/material/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

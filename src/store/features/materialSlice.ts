import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Material } from '../../schema/material-schema';

interface materialState {
  material: Material[];
  viewMaterial: Material | null;
}

const initialState: materialState = {
  material: [],
  viewMaterial: null,
};

export const MaterialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    setMaterial: (state, action: PayloadAction<Material[] | []>) => {
      const { payload } = action;
      state.material = payload;
    },
    addMaterial: (state, action: PayloadAction<Material>) => {
      const { payload } = action;
      state.material.push(payload);
    },
    setViewMaterial: (state, action: PayloadAction<Material>) => {
      const { payload } = action;
      state.viewMaterial = payload;
    },
    setUpdateMaterial: (state, action: PayloadAction<Material>) => {
      const { payload } = action;
      state.viewMaterial = payload;

      const newMaterial = state.material.map((item) => {
        if (item.id === payload.id) {
          return (item = payload);
        } else {
          return item;
        }
      });

      state.material = newMaterial;
    },
    setDeleteMaterial: (state, action: PayloadAction<string>) => {
      const { payload } = action;

      state.viewMaterial = null;

      const upDateMaterial = state.material.filter(
        (item) => item.id !== payload
      );

      state.material = upDateMaterial;
    },
  },
});

export const {
  setMaterial,
  addMaterial,
  setViewMaterial,
  setUpdateMaterial,
  setDeleteMaterial,
} = MaterialSlice.actions;

export default MaterialSlice.reducer;

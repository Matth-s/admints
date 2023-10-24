import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  ref,
  uploadBytes,
  list,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../firebaseConf';
import { arrayPicture } from '../schema/material-schema';

export const postImagesService = createAsyncThunk(
  'postImage',
  async ({ files, id }: { files: any; id: string }, {}) => {
    try {
      await Promise.all(
        files.map(async (file: any) => {
          const filePath = `material/${id}/${file.name}`;
          const fileRef = ref(storage, filePath);

          await uploadBytes(fileRef, file);
        })
      );
    } catch (error) {
      throw error;
    }
  }
);

export const updateImageService = createAsyncThunk(
  'updateImage',
  async (
    {
      images,
      idMaterial,
    }: { images: arrayPicture[] | []; idMaterial: string },
    {}
  ) => {
    try {
      const folderRef = ref(storage, `material/${idMaterial}/`);
      const items = await list(folderRef);

      if (images.length > 0) {
        for (const item of items.items) {
          if (!images.some((image) => item.name === image.id)) {
            await deleteObject(
              ref(storage, `material/${idMaterial}/${item.name}`)
            );
          }
        }
      } else {
        for (const item of items.items) {
          await deleteObject(
            ref(storage, `material/${idMaterial}/${item.name}`)
          );
        }
      }
    } catch (error) {
      throw error;
    }
  }
);

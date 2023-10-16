import { createAsyncThunk } from '@reduxjs/toolkit';

import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../firebaseConf';

export const postImagesService = createAsyncThunk(
  'postImage',
  async ({ files, id }: { files: any; id: string }, {}) => {
    console.log(files);

    try {
      const downloadUrls = await Promise.all(
        files.map(async (file: any) => {
          const filePath = `material/${id}/${file.name}`;
          const fileRef = ref(storage, filePath);

          await uploadBytes(fileRef, file);

          const source = await getDownloadURL(fileRef);

          return { id: file.name, src: source };
        })
      );

      return downloadUrls;
    } catch (error) {
      throw error;
    }
  }
);

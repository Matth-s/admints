import React from 'react';
import { Material, arrayPicture } from '../../schema/material-schema';
import { FileData } from '../../schema/file-schema';
import { v4 as uuidv4 } from 'uuid';

import { useDropzone } from 'react-dropzone';

import iconCross from '../../assets/icon-cross.svg';

import './style.scss';

type Props = {
  arrayPicture: arrayPicture[];
  setFiles: React.Dispatch<React.SetStateAction<any>>;
  files: FileData[];
  images: arrayPicture[];
  setImages: React.Dispatch<React.SetStateAction<arrayPicture[]>>;
  setFormData: React.Dispatch<React.SetStateAction<Material>>;
  presentationPicture: string;
};

const AddImageForm = ({
  arrayPicture,
  setFiles,
  files,
  images,
  setImages,
  setFormData,
  presentationPicture,
}: Props) => {
  const handleRemoveImage = (id: string) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);

    const updatedFiles = files.filter((file) => file.name !== id);
    setFiles(updatedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {},
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const id = uuidv4();

        const newImages = {
          id: id,
          src: URL.createObjectURL(file),
        };

        setImages((prev) => [...prev, { ...newImages }]);

        const updatedFile = new File([file], id, {
          type: file.type,
          lastModified: file.lastModified,
        });

        setFiles((prevFiles: File[]) => [...prevFiles, updatedFile]);
      });
    },
  });

  const handleImageMain = (id: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        presentationPicture: id,
      };
    });
  };

  const thumbs =
    images.length > 0 &&
    images.map((item) => (
      <div
        className={`${
          presentationPicture.includes(item.id) ? 'image-main' : ''
        } thumbs-container`}
        key={item.id}
      >
        <div onClick={() => handleImageMain(item.id)}>
          <img src={item.src} alt={item.id} />
          <button onClick={() => handleRemoveImage(item.id)}>
            <img src={iconCross} alt="supprimer" />
          </button>
        </div>
      </div>
    ));

  return (
    <div className="add-image-form-container">
      <h4>Images</h4>

      {(arrayPicture.length > 0 ||
        files.length > 0 ||
        images.length > 0) && (
        <aside className="flex">{thumbs}</aside>
      )}

      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Cliquer pour ajouter des images</p>
      </div>
    </div>
  );
};

export default AddImageForm;

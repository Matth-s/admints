import React from 'react';

import DeleteMaterialButton from '../buttons/deleteMaterialButton/DeleteMaterialButton';

import './style.scss';
import AddBookingButton from '../buttons/addBookingButton/AddBookingButton';
import { Material } from '../../schema/material-schema';

type Props = {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
  material: Material;
};

const ActionBar = ({
  setIsEditing,
  setOpenDelete,
  material,
}: Props) => {
  return (
    <div className="action-bar flex">
      <button onClick={() => setIsEditing((prev) => !prev)}>
        Editer
      </button>

      <AddBookingButton material={material} />
      <DeleteMaterialButton setDelete={() => setOpenDelete(true)} />
    </div>
  );
};

export default ActionBar;

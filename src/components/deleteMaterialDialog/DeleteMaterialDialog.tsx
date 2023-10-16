import React from 'react';

import CancelButton from '../buttons/cancelButton/CancelButton';
import ConfirmDeleteButton from '../buttons/confirmDeleteButton/ConfirmDeleteButton';

import './style.scss';

type Props = {
  name: string;
  id: string;
  closeModal: () => void;
};

const DeleteMaterialDialog = ({ name, id, closeModal }: Props) => {
  return (
    <div className="delete-material-dialog-container">
      Confirmer la suppression de '{name}' ?
      <div className=" button-div flex">
        <CancelButton closeModal={closeModal} />
        <ConfirmDeleteButton id={id} />
      </div>
    </div>
  );
};

export default DeleteMaterialDialog;

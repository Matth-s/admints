import React from 'react';

import CloseModalButton from '../../buttons/closeModal/CloseModalButton';

import './style.scss';
import DeleteMaterialDialog from '../../deleteMaterialDialog/DeleteMaterialDialog';

type Props = {
  closeModal: () => void;
  id: string;
  name: string;
};

const DeleteModal = ({ closeModal, id, name }: Props) => {
  return (
    <div className="modal-container flex">
      <CloseModalButton closeModal={closeModal} />
      <DeleteMaterialDialog
        name={name}
        id={id}
        closeModal={closeModal}
      />
    </div>
  );
};

export default DeleteModal;

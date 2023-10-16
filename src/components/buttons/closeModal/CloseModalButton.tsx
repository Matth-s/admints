import React from 'react';

import iconCross from '../../../assets/icon-cross.svg';

import './style.scss';

type Props = {
  closeModal: () => void;
};

const CloseModalButton = ({ closeModal }: Props) => {
  const handleClose = () => {
    closeModal();
  };

  return (
    <button
      className="close-modal-button flex "
      onClick={() => handleClose()}
    >
      <img src={iconCross} alt="fermer" />
    </button>
  );
};

export default CloseModalButton;

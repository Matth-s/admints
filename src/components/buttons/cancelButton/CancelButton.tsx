import React from 'react';

type Props = {
  closeModal: () => void;
};

const CancelButton = ({ closeModal }: Props) => {
  const handleCancel = () => {
    closeModal();
  };

  return <button onClick={() => handleCancel()}>Annuler</button>;
};

export default CancelButton;

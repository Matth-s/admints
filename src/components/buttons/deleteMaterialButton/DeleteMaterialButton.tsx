import React from 'react';

type Props = {
  setDelete: () => void;
};

const DeleteMaterialButton = ({ setDelete }: Props) => {
  const handleDelete = () => {
    setDelete();
  };

  return <button onClick={() => handleDelete()}>Supprimer</button>;
};

export default DeleteMaterialButton;

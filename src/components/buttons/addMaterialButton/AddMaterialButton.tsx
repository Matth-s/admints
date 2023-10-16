import React from 'react';

type Props = {
  handleAddMaterial(): void;
};

const AddMaterialButton = ({ handleAddMaterial }: Props) => {
  return (
    <span onClick={() => handleAddMaterial()}>
      Ajouter un matériel
    </span>
  );
};

export default AddMaterialButton;

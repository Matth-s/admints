import React from 'react';

type Props = {
  name: string;
  id: string;
  price: number;
  onHandleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ): void;
};

import './style.scss';

const ProvidedMaterialRowForm = ({
  name,
  price,
  id,
  onHandleChange,
}: Props) => {
  return (
    <div className="provided-material-row flex">
      <input
        type="text"
        name="materialName"
        id="materialName"
        defaultValue={name}
        placeholder="nom du materiel"
        required
        onChange={(e) => onHandleChange(e, id)}
      />
      <input
        type="number"
        name="price"
        id="price"
        defaultValue={price}
        required
        onChange={(e) => onHandleChange(e, id)}
      />
    </div>
  );
};

export default ProvidedMaterialRowForm;

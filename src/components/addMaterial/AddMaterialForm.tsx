import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Material,
  providedMaterials,
} from '../../schema/material-schema';

import { UseFormSetValue } from 'react-hook-form';

import ProvidedMaterialRowForm from '../providedMaterialForm/ProvidedMaterialForm';
import DeleteProvidedMaterialButton from '../buttons/deleteProvidedMaterial/DeleteProvidedMaterialButton';

import './style.scss';

type Props = {
  providedMaterials: providedMaterials[] | [];
  setValue: UseFormSetValue<Material>;
  errors: any;
};

const AddMaterialForm = ({
  providedMaterials,
  setValue,
  errors,
}: Props) => {
  const [providedMaterial, setProvidedMaterial] = useState<
    providedMaterials[] | []
  >(providedMaterials);

  useEffect(() => {
    setValue('providedMaterials', providedMaterial);
  }, [providedMaterial]);

  const handleAddMaterial = () => {
    setProvidedMaterial((prev) => [
      ...prev,
      { id: uuidv4(), materialName: '', price: 0 },
    ]);
  };

  const handleDeleteMaterial = (id: string) => {
    setProvidedMaterial(
      providedMaterial.filter((material) => material.id !== id)
    );
  };

  const onHandleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { name, value } = e.target;
    setProvidedMaterial((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (name === 'price') {
            return {
              ...item,
              [name]: value === '' ? 0 : parseInt(value),
            };
          }

          return {
            ...item,
            [name]: value,
          };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <div className="add-material-form">
      <h4>Matériel fournit</h4>

      {providedMaterial.length > 0 &&
        providedMaterial.map((item) => (
          <div
            key={item.id}
            className="provided-material-row-container flex"
          >
            <ProvidedMaterialRowForm
              name={item.materialName}
              price={item.price}
              id={item.id}
              onHandleChange={onHandleChange}
            />

            <DeleteProvidedMaterialButton
              handleDeleteMaterial={handleDeleteMaterial}
              id={item.id}
            />
          </div>
        ))}

      <span onClick={() => handleAddMaterial()}>
        Ajouter un matériel
      </span>

      {errors !== undefined && (
        <p className="error">
          Il y a une erreur dans les matériaux founit
        </p>
      )}
    </div>
  );
};

export default AddMaterialForm;

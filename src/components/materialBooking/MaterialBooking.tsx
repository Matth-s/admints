import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { UseFormSetValue } from 'react-hook-form';

import {
  providedMaterialsBooking,
  Booking,
} from '../../schema/booking-schema';

import './style.scss';

type Props = {
  providedMaterials: providedMaterialsBooking[] | [];
  setValue: UseFormSetValue<Booking>;
};

const MaterialBooking = ({ providedMaterials, setValue }: Props) => {
  const onHandleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { value, name } = e.target;
    const updateMaterialProvided = providedMaterials.map((item) => {
      if (item.id === id) {
        if (name === 'quantity' || name === 'price') {
          return {
            ...item,
            [name]: value === '' ? 0 : parseInt(value),
            total:
              name === 'price'
                ? value === ''
                  ? 0
                  : parseInt(value) * item.quantity
                : value === ''
                ? 0
                : parseInt(value) * item.price,
          };
        } else {
          return {
            ...item,
            [name]: value,
          };
        }
      }

      return item;
    });

    setValue('providedMaterialsBooking', updateMaterialProvided);
  };

  const handleAddMaterial = () => {
    const material: providedMaterialsBooking = {
      id: uuidv4(),
      materialName: '',
      quantity: 1,
      price: 0,
      total: 0,
    };

    setValue('providedMaterialsBooking', [
      ...providedMaterials,
      material,
    ]);
  };

  const handleDelete = (id: string) => {
    const providedMaterialsFiltred = providedMaterials.filter(
      (item) => item.id !== id
    );
    setValue('providedMaterialsBooking', providedMaterialsFiltred);
  };

  return (
    <div className="material-booking-container">
      <table className="material-booking-table">
        <thead>
          <tr>
            <th>Nom du matériel</th>
            <th>Quantité</th>
            <th>Prix</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {providedMaterials.length > 0 &&
            providedMaterials.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="text"
                    name="materialName"
                    defaultValue={item.materialName}
                    onChange={(e) => onHandleChange(e, item.id)}
                    placeholder="Nom du materiel"
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="quantity"
                    defaultValue={item.quantity}
                    onChange={(e) => onHandleChange(e, item.id)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="price"
                    defaultValue={item.price}
                    onChange={(e) => onHandleChange(e, item.id)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="total"
                    disabled
                    value={item.total}
                  />
                </td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>
                    X
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={() => handleAddMaterial()}>
        Ajouter un matériel
      </button>
    </div>
  );
};

export default MaterialBooking;

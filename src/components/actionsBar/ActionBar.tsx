import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { setCreateBooking } from '../../store/features/bookingSlice';
import { useAppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { Material } from '../../schema/material-schema';

import './style.scss';
import {
  setSearchBooking,
  setSearchChoice,
} from '../../store/features/searchSlice';

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddBooking = () => {
    const providedMaterialsBooking =
      material.providedMaterials.length > 0
        ? material.providedMaterials.map((item) => {
            return {
              ...item,
              quantity: 1,
              total: item.price,
            };
          })
        : [];

    const materialToBooking = {
      id: uuidv4(),
      idMaterial: material.id,
      materialName: material.name,
      total: 0,
      pricePerDay: material.pricePerDay,
      providedMaterialsBooking: providedMaterialsBooking,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      city: '',
      street: '',
      unavailableDates: material.unavailableDates,
      bookingDates: [],
      coachingPriceHour: material.coachingPriceHour,
      coachingTime: 0,
      isCompleted: false,
      downPayment: material.downPayment,
      timestamp: Date.now(),
    };

    dispatch(setCreateBooking(materialToBooking));
    navigate(`/create-booking/${material.id}`);
  };

  const handleGoViewBooking = () => {
    dispatch(setSearchChoice('materialName'));
    dispatch(setSearchBooking(material.name.toLowerCase()));
    navigate('/booking');
  };

  return (
    <div className="action-bar flex">
      <button onClick={() => setIsEditing((prev) => !prev)}>
        Editer
      </button>

      <button onClick={() => handleAddBooking()}>
        Ajouter une réservation
      </button>

      <button onClick={() => handleGoViewBooking()}>
        Aller aux reservations concernant ce matériel
      </button>

      <button onClick={() => setOpenDelete(true)}>Supprimer</button>
    </div>
  );
};

export default ActionBar;

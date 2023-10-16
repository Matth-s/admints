import { v4 as uuidv4 } from 'uuid';

import { useNavigate } from 'react-router-dom';
import { Material } from '../../../schema/material-schema';
import { useAppDispatch } from '../../../store/store';
import { setCreateBooking } from '../../../store/features/bookingSlice';

type Props = {
  material: Material;
};

const AddBookingButton = ({ material }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
  };

  const handleAddBooking = () => {
    dispatch(setCreateBooking(materialToBooking));
    navigate(`/create-booking/${material.id}`);
  };

  return (
    <button onClick={() => handleAddBooking()}>
      Ajouter une réservation
    </button>
  );
};

export default AddBookingButton;

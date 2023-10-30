import { useEffect } from 'react';

import { useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';

import BookingForm from '../../components/forms/booking/BookingForm';
import Header from '../../components/header/Header';
import BackButton from '../../components/buttons/back/BackButton';

import './style.scss';

const CreateBookingPage = () => {
  const { createBooking } = useAppSelector(
    (state) => state.bookingSlice
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!createBooking) {
      navigate('/booking');
    }
  }, []);

  if (!createBooking) {
    return;
  }

  return (
    <div className="create-booking-container">
      <Header />

      <div className="create-booking-content">
        <BackButton />
        <BookingForm isEditing={false} booking={createBooking} />
      </div>
    </div>
  );
};

export default CreateBookingPage;

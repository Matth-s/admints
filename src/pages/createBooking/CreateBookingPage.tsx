import { useEffect } from 'react';

import { useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';

import BookingForm from '../../components/forms/booking/BookingForm';
import Header from '../../components/header/Header';

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
    <section className="create-booking-page">
      <Header />

      <div className="create-booking-content">
        <BookingForm isEditing={false} booking={createBooking} />
      </div>
    </section>
  );
};

export default CreateBookingPage;

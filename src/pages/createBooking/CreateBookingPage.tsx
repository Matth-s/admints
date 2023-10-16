import React, { useEffect } from 'react';

import Header from '../../components/header/Header';
import { useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';

const CreateBookingPage = () => {
  const { createBooking } = useAppSelector(
    (state) => state.bookingSlice
  );
  const navigate = useNavigate();

  console.log(createBooking);

  useEffect(() => {
    if (!createBooking) {
      return navigate('/material');
    }
  }, []);

  return (
    <div className="create-booking-page">
      <Header />
    </div>
  );
};

export default CreateBookingPage;

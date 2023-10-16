import React, { useEffect } from 'react';

import Header from '../../components/header/Header';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import BookingForm from '../../components/forms/booking/BookingForm';

import './style.scss';
import { getMaterialByIdService } from '../../services/material-service';

const CreateBookingPage = () => {
  const { id } = useParams();
  const { createBooking } = useAppSelector(
    (state) => state.bookingSlice
  );
  const navigate = useNavigate();
  if (!createBooking) {
    return;
  }

  return (
    <section className="create-booking-page">
      <Header />

      <div className="create-booking-content">
        <BookingForm booking={createBooking} />
      </div>
    </section>
  );
};

export default CreateBookingPage;

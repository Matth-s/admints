import React from 'react';

import iconArrowRight from '../../assets/icon-arrow-right.svg';

import { NavLink, useNavigate } from 'react-router-dom';

import { Booking } from '../../schema/booking-schema';

import './style.scss';
import { useAppDispatch } from '../../store/store';
import { setViewBooking } from '../../store/features/bookingSlice';

type Props = {
  booking: Booking;
};

const BookingCard = ({ booking }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleViewBooking = (id: string, booking: Booking) => {
    dispatch(setViewBooking(booking));
    navigate(`/view-booking/${id}`);
  };

  return (
    <tr onClick={() => handleViewBooking(booking.id, booking)}>
      <td>{booking.bookingDates[0]}</td>
      <td>{booking.bookingDates[booking.bookingDates.length - 1]}</td>
      <td>{booking.materialName}</td>
      <td>{booking.lastName}</td>
      <td>{booking.firstName}</td>
      <td>{booking.total}</td>
      <td>{booking.isCompleted ? 'Payé' : 'Non payé'}</td>
    </tr>
  );
};

export default BookingCard;

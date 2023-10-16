import React from 'react';

import Header from '../../components/header/Header';
import Loader from '../../components/loader/Loader';
import './style.scss';
import { useAppSelector } from '../../store/store';

type Props = {
  isLoading: boolean;
};

const BookingPage = ({ isLoading }: Props) => {
  const { booking } = useAppSelector((state) => state.bookingSlice);

  if (isLoading) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }

  return (
    <div className="booking-page-container">
      <Header />
      <div className="booking-content"></div>
      bookingpage
    </div>
  );
};

export default BookingPage;

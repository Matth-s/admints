import { useMemo } from 'react';

import Header from '../../components/header/Header';
import Loader from '../../components/loader/Loader';
import BookingCard from '../../components/bookingCard/BookingCard';
import SearchBarBooking from '../../components/searchBarBooking/SearchBarBooking';

import { useAppSelector } from '../../store/store';

import './style.scss';

type Props = {
  isLoading: boolean;
};

const BookingPage = ({ isLoading }: Props) => {
  const { booking } = useAppSelector((state) => state.bookingSlice);
  const { searchBooking, searchChoice } = useAppSelector(
    (state) => state.searchSlice
  );

  const bookingMemo = useMemo(() => {
    switch (searchChoice) {
      case 'materialName':
        return booking.filter((item) =>
          item.materialName.toLowerCase().includes(searchBooking)
        );
      case 'firstName':
        return booking.filter((item) =>
          item.firstName.toLowerCase().startsWith(searchBooking)
        );
      case 'lastName':
        return booking.filter((item) =>
          item.lastName.toLowerCase().startsWith(searchBooking)
        );
      case 'paid':
        return booking.filter((item) => item.isCompleted === true);
      case 'notPaid':
        return booking.filter((item) => item.isCompleted === false);
      case 'hightToLow':
        return booking.slice().sort((a, b) => a.total - b.total);
      case 'lowToHight':
        return booking.slice().sort((a, b) => b.total - a.total);
      default:
        return booking.length > 0
          ? booking.slice().sort((a, b) => b.timestamp - a.timestamp)
          : booking;
    }
  }, [booking, searchChoice, searchBooking]);

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
      <div className="booking-content">
        <SearchBarBooking />

        <section className="table-section">
          <table>
            <thead>
              <tr>
                <th>Date de début</th>
                <th>Date de fin</th>
                <th>Matériel</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {bookingMemo.length > 0 ? (
                bookingMemo.map((item) => (
                  <BookingCard key={item.id} booking={item} />
                ))
              ) : (
                <tr className="empty-tr">
                  <td className="absolute absolute__center">
                    {searchChoice.length === 0
                      ? 'Aucune réservation'
                      : 'Aucun résultat pour cette recherche'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default BookingPage;

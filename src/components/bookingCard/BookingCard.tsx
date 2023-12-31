import { useNavigate } from 'react-router-dom';

import { Booking } from '../../schema/booking-schema';

import './style.scss';
import { useAppDispatch } from '../../store/store';
import { setViewBooking } from '../../store/features/bookingSlice';
import Status from '../status/Status';
import { formatDate } from '../../helpers/format-date';

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
      <td>{formatDate(booking.bookingDates[0])}</td>
      <td>
        {formatDate(
          booking.bookingDates[booking.bookingDates.length - 1]
        )}
      </td>
      <td>{booking.materialName}</td>
      <td>{booking.lastName}</td>
      <td>{booking.firstName}</td>
      <td>{booking.total}</td>
      <td>
        <Status status={booking.isCompleted ? 'paid' : 'notPaid'} />
      </td>
    </tr>
  );
};

export default BookingCard;

import { putSpaceOnString } from '../../helpers/spacingPhone';
import { Booking } from '../../schema/booking-schema';
import ProvidedMaterialBooking from '../providedMaterialBooking/ProvidedMaterialBooking';

import './style.scss';

type Props = {
  booking: Booking;
};

const BookingInformation = ({ booking }: Props) => {
  return (
    <section className="booking-information-container flex">
      <div>
        <h2>Information client : </h2>
        <ul>
          <li>Nom: {booking.lastName}</li>
          <li>Prénom: {booking.firstName}</li>
          <li>Ville: {booking.city}</li>
          <li>Rue: {booking.street}</li>
          <li>Téléphone: {putSpaceOnString(booking.phone)}</li>
        </ul>
      </div>

      <div>
        <h2>Matériel à fournir :</h2>

        <ProvidedMaterialBooking
          material={booking.providedMaterialsBooking}
        />
      </div>
    </section>
  );
};

export default BookingInformation;

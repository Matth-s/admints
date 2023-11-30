import { Booking } from '../../schema/booking-schema';

import './style.scss';

type Props = {
  booking: Booking;
};

const BookingInformation = ({ booking }: Props) => {
  console.log(booking);

  return (
    <section className="booking-information-container flex">
      <div>
        <h2>Information client : </h2>
        <ul>
          <li>Nom: {booking.lastName}</li>
          <li>Prénom: {booking.firstName}</li>
          <li>Ville: {booking.city}</li>
          <li>Rue: {booking.street}</li>
          <li>Téléphone: {booking.phone}</li>
        </ul>
      </div>

      <div>
        <h2>Materiel à fournir :</h2>
        {booking.providedMaterialsBooking.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Quantité</th>
              </tr>
            </thead>
            <tbody>
              {booking.providedMaterialsBooking.map((item) => (
                <tr key={item.id}>
                  <td>{item.materialName}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucun matériel</p>
        )}
      </div>
    </section>
  );
};

export default BookingInformation;

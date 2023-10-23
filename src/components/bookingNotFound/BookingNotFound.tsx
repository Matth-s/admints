import { useNavigate } from 'react-router-dom';

import './style.scss';

const BookingNotFound = () => {
  const navigate = useNavigate();

  const handleGoBooking = () => {
    navigate('/booking');
  };
  return (
    <div className="booking-not-found-container absolute absolute__center">
      <h2>Il semblerait que cette réservation n'existe pas</h2>
      <button onClick={() => handleGoBooking()}>
        Retour aux réservations
      </button>
    </div>
  );
};

export default BookingNotFound;

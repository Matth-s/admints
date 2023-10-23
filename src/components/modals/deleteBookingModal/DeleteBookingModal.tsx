import { useState } from 'react';

import { deleteBookingByIdService } from '../../../services/booking-service';
import { Booking } from '../../../schema/booking-schema';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useNavigate } from 'react-router-dom';

import CloseModalButton from '../../buttons/closeModal/CloseModalButton';
import CancelButton from '../../buttons/cancelButton/CancelButton';

type Props = {
  closeModal: () => void;
  booking: Booking;
};

const DeleteBookingModal = ({ closeModal, booking }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token } = useAppSelector((state) => state.userSlice);

  const handleDelete = async () => {
    setIsLoading(true);
    await dispatch(
      deleteBookingByIdService({ id: booking.id, token })
    )
      .unwrap()
      .then((res: number) => {
        if (res === 200) {
          navigate('/booking');
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        closeModal();
        setIsLoading(false);
      });
  };

  return (
    <div className="modal-container flex">
      <CloseModalButton closeModal={closeModal} />

      <div className="delete-material-dialog-container">
        <h2>Confirmez-vous la suppression de cette réservation ?</h2>
        <div className="button-div flex">
          <CancelButton
            isLoading={isLoading}
            closeModal={closeModal}
          />
          <button
            className={isLoading ? 'isLoading' : ''}
            onClick={() => handleDelete()}
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookingModal;

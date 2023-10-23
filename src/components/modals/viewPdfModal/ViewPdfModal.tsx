import CloseModalButton from '../../buttons/closeModal/CloseModalButton';
import ViewBookingPdf from '../../viewBookingPdf/ViewBookingPdf';

import { Booking } from '../../../schema/booking-schema';

type Props = {
  closeModal: () => void;
  booking: Booking;
};

const ViewPdfModal = ({ closeModal, booking }: Props) => {
  return (
    <div className="modal-container">
      <CloseModalButton closeModal={closeModal} />
      <ViewBookingPdf booking={booking} />
    </div>
  );
};

export default ViewPdfModal;

import CloseModalButton from '../../buttons/closeModal/CloseModalButton';
import ViewCalendar from '../../calendars/viewCalendar/ViewCalendar';

type Props = {
  closeModal: () => void;
  disabledDates: string[] | [];
};

const CalendarModal = ({ closeModal, disabledDates }: Props) => {
  return (
    <div className="modal-container flex">
      <CloseModalButton closeModal={closeModal} />
      <ViewCalendar disabledDates={disabledDates} />
    </div>
  );
};

export default CalendarModal;

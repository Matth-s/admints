import './style.scss';

type Props = {
  setOpenModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIsditing: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalPdf: React.Dispatch<React.SetStateAction<boolean>>;
  handleMarkAsPaid: () => void;
};

const ActionBooking = ({
  setOpenModalDelete,
  setIsditing,
  setOpenModalPdf,
  handleMarkAsPaid,
}: Props) => {
  return (
    <div className="action-booking-container flex">
      <button onClick={handleMarkAsPaid}>Marquer comme payé</button>
      <button onClick={() => setIsditing((prev) => !prev)}>
        Modifier
      </button>
      <button onClick={() => setOpenModalPdf(() => true)}>
        Afficher le pdf
      </button>
      <button onClick={() => setOpenModalDelete(() => true)}>
        Suprimer
      </button>
    </div>
  );
};

export default ActionBooking;

type Props = {
  closeModal: () => void;
  isLoading: boolean;
};

const CancelButton = ({ closeModal, isLoading }: Props) => {
  return (
    <button
      className={isLoading ? 'isLoading' : ''}
      onClick={() => closeModal()}
    >
      Annuler
    </button>
  );
};

export default CancelButton;

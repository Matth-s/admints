import crossIcon from '../../../assets/icon-cross.svg';

import './style.scss';

type Props = {
  handleDeleteMaterial(id: string): void;
  id: string;
};

const DeleteProvidedMaterialButton = ({
  handleDeleteMaterial,
  id,
}: Props) => {
  return (
    <span
      onClick={() => handleDeleteMaterial(id)}
      className="delete-provided-material-button"
    >
      <img src={crossIcon} alt="supprimer" />
    </span>
  );
};

export default DeleteProvidedMaterialButton;

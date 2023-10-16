import { useNavigate } from 'react-router-dom';

import './style.scss';

const CreateNewMaterialButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/create-material');
  };

  return (
    <button
      className="create-new-material-button absolute absolute__center"
      onClick={() => handleClick()}
    >
      Créer une annonce
    </button>
  );
};

export default CreateNewMaterialButton;

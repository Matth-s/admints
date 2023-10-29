import { useNavigate } from 'react-router-dom';

import arrowRight from '../../../assets/icon-back-arrow.svg';

import './style.scss';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      className="back-button flex flex__alignCenter"
      onClick={() => handleBack()}
    >
      <img src={arrowRight} alt="retour" /> Retour
    </button>
  );
};

export default BackButton;

import { useNavigate } from 'react-router-dom';

import './style.scss';

type Props = { id: string };

const MaterialNotFound = ({ id }: Props) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/material');
  };

  return (
    <div className="material-not-found absolute absolute__center">
      <h2>
        Le matériel avec l'identifiant '{id}' n'a pas été trouvé
      </h2>
      <button onClick={() => handleGoHome()}>
        Retour a l'accueil
      </button>
    </div>
  );
};

export default MaterialNotFound;

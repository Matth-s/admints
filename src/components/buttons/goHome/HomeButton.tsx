import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/material');
  };

  return (
    <button onClick={() => handleGoHome()}>Retour a l'accueil</button>
  );
};

export default HomeButton;

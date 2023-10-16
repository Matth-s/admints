import React from 'react';
import HomeButton from '../buttons/goHome/HomeButton';

import './style.scss';

type Props = { id: string };

const MaterialNotFound = ({ id }: Props) => {
  return (
    <div className="material-not-found absolute absolute__center">
      <h2>
        Le matériel avec l'identifiant '{id}' n'a pas été trouvé
      </h2>
      <HomeButton />
    </div>
  );
};

export default MaterialNotFound;

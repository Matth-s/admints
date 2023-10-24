import { Material } from '../../schema/material-schema';

import './style.scss';

type Props = {
  material: Material;
};

const MaterialInformation = ({ material }: Props) => {
  return (
    <div className="material-information">
      <h2>{material.name}</h2>
      <p>Description: {material.description}</p>
      <p>Prix par jour: {material.pricePerDay}</p>
      <p>Acompte: {material.downPayment}</p>
      <p>
        Tarif de coaching par heure: {material.coachingPriceHour}{' '}
      </p>
    </div>
  );
};

export default MaterialInformation;

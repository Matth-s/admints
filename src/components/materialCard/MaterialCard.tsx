import { NavLink, Link } from 'react-router-dom';

import ViewButton from '../buttons/view/ViewButton';

import emptyImage from '../../assets/empty-image.svg';

import './style.scss';
import { Material } from '../../schema/material-schema';

type Props = {
  material: Material;
};

const MaterialCard = ({ material }: Props) => {
  return (
    <article className="material-card-article flex flex__alignCenter flex__spaceBetween">
      <img
        src={
          material.presentationPicture === ''
            ? emptyImage
            : material.presentationPicture
        }
        alt="Image de présentation"
      />

      <div>
        <h3>{material.name}</h3>
        <p>{material.description}</p>
      </div>

      <ViewButton id={material.id} material={material} />
    </article>
  );
};

export default MaterialCard;

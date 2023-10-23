import { useAppDispatch } from '../../store/store';
import { setViewMaterial } from '../../store/features/materialSlice';
import { Material } from '../../schema/material-schema';
import { useNavigate } from 'react-router-dom';

import emptyImage from '../../assets/empty-image.svg';

import './style.scss';

type Props = {
  material: Material;
};

const MaterialCard = ({ material }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleViewItem = (id: string) => {
    navigate(`/view-material/${id}`);
    dispatch(setViewMaterial(material));
  };

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

      <button onClick={() => handleViewItem(material.id)}>
        Afficher
      </button>
    </article>
  );
};

export default MaterialCard;

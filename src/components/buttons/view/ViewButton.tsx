import { useNavigate } from 'react-router-dom';
import { Material } from '../../../schema/material-schema';
import { useAppDispatch } from '../../../store/store';
import { setViewMaterial } from '../../../store/features/materialSlice';

type Props = {
  id: string;
  material: Material;
};

const ViewButton = ({ id, material }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleViewItem = () => {
    navigate(`/view-material/${id}`);
    dispatch(setViewMaterial(material));
  };

  return <button onClick={() => handleViewItem()}>Afficher</button>;
};

export default ViewButton;

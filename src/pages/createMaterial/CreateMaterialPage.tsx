import { Material } from '../../schema/material-schema';
import { v4 as uuidv4 } from 'uuid';

import Header from '../../components/header/Header';
import MaterialForm from '../../components/forms/material/MaterialForm';

import './style.scss';

const CreateMaterialPage = () => {
  const formData: Material = {
    id: uuidv4(),
    name: '',
    downPayment: 0,
    unavailableDates: [],
    providedMaterials: [],
    presentationPicture: '',
    arrayPicture: [],
    description: '',
    visible: true,
    pricePerDay: 0,
    coachingPriceHour: 0,
  };

  return (
    <div className="create-material-page-container">
      <Header />
      <MaterialForm material={formData} isEditing={false} />
    </div>
  );
};

export default CreateMaterialPage;

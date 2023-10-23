import { useState } from 'react';
import {
  Material,
  arrayPicture,
} from '../../../schema/material-schema';

import { FileData } from '../../../schema/file-schema';

import { useAppDispatch, useAppSelector } from '../../../store/store';
import {
  createMaterialService,
  updateMaterialService,
} from '../../../services/material-service';

import {
  postImagesService,
  updateImageService,
} from '../../../services/image-service';
import { useNavigate } from 'react-router-dom';

import AddMaterialForm from '../../addMaterial/AddMaterialForm';
import AddImageForm from '../../addImageForm/AddImageForm';

import './style.scss';

type Props = {
  material: Material;
  isEditing: boolean;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
};

const MaterialForm = ({
  material,
  isEditing,
  setIsEditing,
}: Props) => {
  const [formData, setFormData] = useState<Material>(material);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<FileData[]>([]);
  const [images, setImages] = useState<arrayPicture[]>(
    formData.arrayPicture
  );
  const { token } = useAppSelector((state) => state.userSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === 'visible') {
        return {
          ...prev,
          [name]: !formData.visible,
        };
      }

      if (
        name === 'pricePerDay' ||
        name === 'downPayment' ||
        name === 'coachingPriceHour'
      ) {
        return {
          ...prev,
          [name]: value === '' ? 0 : parseInt(value),
        };
      }

      return {
        ...prev,
        [name]: value.trim(),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (files.length > 0) {
      await dispatch(postImagesService({ files, id: formData.id }));
    }

    if (isEditing) {
      await dispatch(
        updateImageService({ images, idMaterial: formData.id })
      );

      await dispatch(
        updateMaterialService({
          material: formData,
          token,
          id: formData.id,
        })
      )
        .unwrap()
        .then((res: number) => {
          if (res === 200 && setIsEditing) {
            setIsEditing(false);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    } else {
      await dispatch(
        createMaterialService({ material: formData, token })
      )
        .then((res: any) => {
          if (res.payload.status === 201) {
            navigate(`/view-material/${res.payload.idMaterial}`);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <form className="material-form" onSubmit={(e) => handleSubmit(e)}>
      <div className="form-div">
        <label htmlFor="name">Nom du matériel</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          defaultValue={formData.name}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="form-div">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          defaultValue={formData.description}
          onChange={(e) => handleChange(e)}
        ></textarea>
      </div>

      <div className="form-div">
        <label htmlFor="pricePerDay">Tarif par jour</label>
        <input
          type="number"
          name="pricePerDay"
          id="pricePerDay"
          required
          defaultValue={formData.pricePerDay}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="form-div">
        <label htmlFor="downPayment">Acompte</label>
        <input
          type="number"
          name="downPayment"
          id="downPayment"
          required
          defaultValue={formData.downPayment}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="form-div">
        <label htmlFor="coachingPriceHour">
          Prix du coaching par heure
        </label>
        <input
          type="number"
          name="coachingPriceHour"
          id="coachingPriceHour"
          required
          defaultValue={formData.coachingPriceHour}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="form-div">
        <AddMaterialForm
          providedMaterials={formData.providedMaterials}
          setFormData={setFormData}
        />
      </div>

      <div className="form-div">
        <AddImageForm
          presentationPicture={formData.presentationPicture}
          arrayPicture={formData.arrayPicture}
          setFiles={setFiles}
          files={files}
          images={images}
          setImages={setImages}
          setFormData={setFormData}
        />
      </div>

      <div className="form-div checkbox-div flex flex__alignCenter">
        <input
          type="checkbox"
          name="visible"
          id="visible"
          defaultChecked={formData.visible}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="visible">Mettre en ligne</label>
      </div>

      <input
        className={isLoading ? 'isLoading' : ''}
        type="submit"
        value="Envoyer"
      />
    </form>
  );
};

export default MaterialForm;

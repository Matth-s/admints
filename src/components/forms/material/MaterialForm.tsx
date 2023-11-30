import { useState } from 'react';
import {
  Material,
  arrayPicture,
} from '../../../schema/material-schema';

import { FileData } from '../../../schema/file-schema';
import { FormMaterialSchema } from '../../../schema/checker-schema';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

type Inputs = z.infer<typeof FormMaterialSchema>;

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
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    values: material,
    resolver: zodResolver(FormMaterialSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<FileData[]>([]);
  const [images, setImages] = useState<arrayPicture[]>(
    watch('arrayPicture')
  );
  const { token } = useAppSelector((state) => state.userSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    if (files.length > 0) {
      await dispatch(postImagesService({ files, id: data.id }));
    }

    if (isEditing) {
      await dispatch(
        updateImageService({ images, idMaterial: data.id })
      );

      await dispatch(
        updateMaterialService({
          material: data,
          token,
          id: data.id,
        })
      )
        .unwrap()
        .then((res: number) => {
          if (res === 200 && setIsEditing) {
            setIsEditing(false);
            reset();
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    } else {
      await dispatch(createMaterialService({ material: data, token }))
        .then((res: any) => {
          if (res.payload.status === 201) {
            navigate(`/view-material/${res.payload.idMaterial}`);
            reset();
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <form
      className="material-form"
      onSubmit={handleSubmit(processForm)}
    >
      <div className="form-div">
        <label htmlFor="name">Nom du matériel</label>
        <input type="text" id="name" {...register('name')} />
        {errors.name?.message && (
          <p className="error-message">{errors.name.message}</p>
        )}
      </div>

      <div className="form-div">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register('description')}
        ></textarea>
        {errors.description?.message && (
          <p className="error-message">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="form-div">
        <label htmlFor="pricePerDay">Tarif par jour</label>
        <input
          type="number"
          id="pricePerDay"
          {...register('pricePerDay')}
        />
        {errors.pricePerDay?.message && (
          <p className="error-message">
            {errors.pricePerDay.message}
          </p>
        )}
      </div>

      <div className="form-div">
        <label htmlFor="downPayment">Acompte</label>
        <input
          type="number"
          id="downPayment"
          {...register('downPayment')}
        />
        {errors.downPayment?.message && (
          <p className="error-message">
            {errors.downPayment.message}
          </p>
        )}
      </div>

      <div className="form-div">
        <label htmlFor="coachingPriceHour">Tarif coaching</label>
        <input
          type="number"
          id="coachingPriceHour"
          {...register('coachingPriceHour')}
        />
        {errors.coachingPriceHour?.message && (
          <p className="error-message">
            {errors.coachingPriceHour.message}
          </p>
        )}
      </div>

      <div className="form-div">
        <AddMaterialForm
          providedMaterials={watch('providedMaterials')}
          setValue={setValue}
          errors={errors.providedMaterials}
        />
      </div>

      <div className="form-div">
        <AddImageForm
          presentationPicture={watch('presentationPicture')}
          arrayPicture={watch('arrayPicture')}
          setFiles={setFiles}
          files={files}
          images={images}
          setImages={setImages}
          setValue={setValue}
        />
      </div>

      <div className="form-div checkbox-div flex flex__alignCenter">
        <input
          type="checkbox"
          id="visible"
          {...register('visible')}
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

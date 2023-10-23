import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { deleteMaterielByIdService } from '../../../services/material-service';
import { useNavigate } from 'react-router-dom';

import CloseModalButton from '../../buttons/closeModal/CloseModalButton';

import CancelButton from '../../buttons/cancelButton/CancelButton';

import './style.scss';

type Props = {
  closeModal: () => void;
  id: string;
  name: string;
};

const DeleteMaterialModal = ({ closeModal, id, name }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { token } = useAppSelector((state) => state.userSlice);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleDelete = async (id: string) => {
    setIsLoading(true);

    await dispatch(deleteMaterielByIdService({ id, token }))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res === 200) {
          navigate('/material');
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="modal-container flex">
      <CloseModalButton closeModal={closeModal} />
      <div className="delete-material-dialog-container">
        <h3>
          Attention la suppression du materiel entrainera une
          impossiblité de modifier les réservations, confirmez-vous la
          suppression de '{name}' ?
        </h3>

        <div className="button-div flex">
          <CancelButton
            isLoading={isLoading}
            closeModal={closeModal}
          />
          <button
            className={`${isLoading ? 'isLoading' : ''}`}
            onClick={() => handleDelete(id)}
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMaterialModal;

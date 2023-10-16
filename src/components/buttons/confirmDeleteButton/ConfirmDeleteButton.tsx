import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { deleteMaterielByIdService } from '../../../services/material-service';
import { useNavigate } from 'react-router-dom';

type Props = {
  id: string;
};

const ConfirmDeleteButton = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.userSlice);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
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
    <button
      className={`${isLoading ? 'isLoading' : ''}`}
      onClick={() => handleDelete(id)}
    >
      Confirmer
    </button>
  );
};

export default ConfirmDeleteButton;

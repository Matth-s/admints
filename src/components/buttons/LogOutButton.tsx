import React from 'react';
import { useAppDispatch } from '../../store/store';
import { logOutService } from '../../services/auth-service';

const LogOutButton = () => {
  const dispatch = useAppDispatch();

  const handleDisconnect = async () => {
    await dispatch(logOutService());
  };

  return (
    <button onClick={() => handleDisconnect()}>Se déconnecter</button>
  );
};

export default LogOutButton;

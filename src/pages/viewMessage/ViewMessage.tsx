import { useEffect, useState } from 'react';
import { toastMessage } from '../../helpers/toastMessage';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import { Message } from '../../schema/message';
import {
  getMessage,
  deleteMessage,
  changeViewOfMessage,
  createBookingFromMessage,
} from '../../services/messaging-service';

import Header from '../../components/header/Header';
import Loader from '../../components/loader/Loader';
import BackButton from '../../components/buttons/back/BackButton';

import 'react-toastify/dist/ReactToastify.css';

import './styles.scss';
import ProvidedMaterialBooking from '../../components/providedMaterialBooking/providedMaterialBooking';

export default function ViewMessage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  const { token } = useAppSelector((state) => state.userSlice);
  const { viewMessage } = useAppSelector(
    (state) => state.messagingSlice
  );

  const fetchMessage = async (id: string) => {
    await dispatch(getMessage({ id, token })).finally(() =>
      setIsLoading(false)
    );
  };

  const handleDelete = async (id: string) => {
    setActionLoading(true);
    await dispatch(deleteMessage({ token, id }))
      .unwrap()
      .then(() => {
        toastMessage('Réservation supprimée', true);
        navigate('/messaging');
      })
      .catch(() => toastMessage('Une erreur est survenue', false))
      .finally(() => setActionLoading(false));
  };

  const handleChangeViewMessage = async (id: string) => {
    setActionLoading(true);
    await dispatch(changeViewOfMessage({ token, id }))
      .unwrap()
      .then(() => toastMessage('Changement de status réussi', true))
      .catch(() => toastMessage('Changement de status échoué', false))
      .finally(() => setActionLoading(false));
  };

  const handleCreateReservation = () => {
    setActionLoading(true);
    const { isRead, ...rest } = viewMessage as Message;
    dispatch(createBookingFromMessage({ token, message: rest }))
      .then(() => {
        toastMessage('Reservation crée', true);
        navigate(`/view-booking/${rest.id}`);
      })
      .catch(() =>
        toastMessage(
          'Une erreur est survenue lors de la création de la réservation',
          false
        )
      )
      .finally(() => setActionLoading(false));
  };

  useEffect(() => {
    if (!viewMessage) {
      setIsLoading(true);
      fetchMessage(id as string);
    } else {
      setIsLoading(false);
    }
  }, []);

  if (!isLoading && !viewMessage) {
    return (
      <>
        <Header />
        <div className="not-found">
          <h3>Ce message n'existe pas</h3>
          <button onClick={() => navigate('/messaging')}>
            Revenir aux demandes de location
          </button>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }

  return (
    <div className="view-message-container">
      <Header />
      {viewMessage && (
        <section>
          <BackButton />
          <div className="action">
            <button
              onClick={() => handleCreateReservation()}
              className={`${actionLoading ? 'loading' : null}`}
            >
              Créer la réservation
            </button>
            <button
              className={`${actionLoading ? 'loading' : null}`}
              onClick={() => handleChangeViewMessage(viewMessage.id)}
            >
              {viewMessage.isRead
                ? 'Marquer comme non lu'
                : 'Marquer comme lu'}
            </button>
            <button
              className={`${actionLoading ? 'loading' : null}`}
              onClick={() => handleDelete(viewMessage.id)}
            >
              Supprimer
            </button>
          </div>

          <div>
            Matériel demandé :
            <ProvidedMaterialBooking
              material={viewMessage.providedMaterialsBooking}
            />
          </div>
        </section>
      )}
    </div>
  );
}

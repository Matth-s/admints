import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Message } from '../../schema/message';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setViewMessage } from '../../store/features/messagingSlice';

import Header from '../../components/header/Header';
import Loader from '../../components/loader/Loader';

import './styles.scss';
import { getAllMessagingService } from '../../services/messaging-service';
import { formatDate } from '../../helpers/format-date';
import { putSpaceOnString } from '../../helpers/spacingPhone';

type Props = {
  isLoading: boolean;
};

const MessagingPage = ({ isLoading }: Props) => {
  const [reFetchLoading, setReFetchLoading] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const disptach = useAppDispatch();
  const { message } = useAppSelector((state) => state.messagingSlice);
  const { token } = useAppSelector((state) => state.userSlice);

  const handleViewMessage = (message: Message) => {
    disptach(setViewMessage(message));
    navigate(`/messaging/view-message/${message.id}`);
  };

  const handleReFetchMessaging = async () => {
    setReFetchLoading(true);
    disptach(getAllMessagingService({ token })).finally(() =>
      setReFetchLoading(false)
    );
  };

  return (
    <div className="messaging-container">
      <Header />

      {isLoading ? (
        <Loader />
      ) : (
        <section className="table-section">
          <button onClick={() => handleReFetchMessaging()}>
            Actualiser
          </button>
          {reFetchLoading ? (
            <Loader />
          ) : (
            <table>
              <thead>
                <tr>
                  <td>Date de début</td>
                  <td>Nom</td>
                  <td>Prenom</td>
                  <td>Matériel</td>
                  <td>Téléphone</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                {message.length > 0 &&
                  message
                    .slice()
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .map((item) => (
                      <tr
                        onClick={() => handleViewMessage(item)}
                        key={item.id}
                      >
                        <td>{formatDate(item.bookingDates[0])}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.materialName}</td>
                        <td>{putSpaceOnString(item.phone)}</td>
                        <td>{item.isRead ? 'Lu' : 'Non lu'}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          )}
        </section>
      )}
    </div>
  );
};

export default MessagingPage;

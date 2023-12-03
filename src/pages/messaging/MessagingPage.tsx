import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Loader from '../../components/loader/Loader';
import { Message } from '../../schema/message';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setViewMessage } from '../../store/features/messagingSlice';

import './styles.scss';

type Props = {
  isLoading: boolean;
};

const MessagingPage = ({ isLoading }: Props) => {
  const navigate = useNavigate();
  const disptach = useAppDispatch();
  const { message } = useAppSelector((state) => state.messagingSlice);

  const handleViewMessage = (message: Message) => {
    disptach(setViewMessage(message));
    navigate(`/messaging/view-message/${message.id}`);
  };

  return (
    <div className="messaging-container">
      <Header />

      {isLoading ? (
        <Loader />
      ) : (
        <section className="table-section">
          <table>
            <thead>
              <tr>
                <td>Nom</td>
                <td>Prenom</td>
                <td>Matériel</td>
                <td>Téléphone</td>
                <td>Date de début</td>
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
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.materialName}</td>
                      <td>{item.phone}</td>
                      <td>{item.bookingDates[0]}</td>
                      <td>{item.isRead ? 'Lu' : 'Non lu'}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};

export default MessagingPage;

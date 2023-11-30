import Header from '../../components/header/Header';
import Loader from '../../components/loader/Loader';
import { useAppSelector } from '../../store/store';

type Props = {
  isLoading: boolean;
};

const MessagingPage = ({ isLoading }: Props) => {
  const { message } = useAppSelector((state) => state.messagingSlice);

  return (
    <div>
      <Header />

      {isLoading ? (
        <Loader />
      ) : (
        message.map((item) => <p key={item.id}>{item.lastName}</p>)
      )}
    </div>
  );
};

export default MessagingPage;

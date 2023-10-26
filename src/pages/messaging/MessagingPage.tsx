import React from 'react';
import Header from '../../components/header/Header';

type Props = {
  isLoading: boolean;
};

const MessagingPage = ({ isLoading }: Props) => {
  return (
    <div>
      <Header />
    </div>
  );
};

export default MessagingPage;

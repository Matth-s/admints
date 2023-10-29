import { useEffect, useState } from 'react';

import './style.scss';

type Props = {
  status: string;
};

const Status = ({ status }: Props) => {
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    switch (status) {
      case 'notPaid':
        setColor('#ff8f00');
        break;
      case 'paid':
        setColor('#33D69F');
        break;
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: `rgba(${color}, 0.4)`,
      }}
      className="status-div flex flex__alignCenter flex__justifyCenter"
    >
      <span style={{ backgroundColor: `${color}` }}></span>
      <h4 style={{ color: `${color}` }}>{`${
        status === 'paid' ? 'Payé' : 'Non payé'
      }`}</h4>
    </div>
  );
};

export default Status;

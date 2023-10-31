import { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { fr } from 'date-fns/locale';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import './style.scss';

type Props = {
  disabledDates: string[] | [];
};

const ViewCalendar = ({ disabledDates }: Props) => {
  const [howManyMonth, setHowManyMonth] = useState<number>(
    window.innerWidth > 720 ? 2 : 1
  );

  useEffect(() => {
    const handleWindowResize = () => {
      setHowManyMonth(window.innerWidth > 720 ? 2 : 1);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const disabledDateRanges =
    disabledDates.length > 0
      ? disabledDates.map((item) => {
          return new Date(item);
        })
      : [];

  return (
    <div className="view-calendar-container">
      <DateRangePicker
        locale={fr}
        onChange={() => null}
        months={howManyMonth}
        ranges={[]}
        disabledDates={disabledDateRanges}
        minDate={new Date()}
        staticRanges={[]}
        inputRanges={[]}
        direction="horizontal"
      />
    </div>
  );
};

export default ViewCalendar;

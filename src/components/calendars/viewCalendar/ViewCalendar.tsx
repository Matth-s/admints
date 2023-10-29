import { DateRangePicker } from 'react-date-range';

import { fr } from 'date-fns/locale';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import './style.scss';

type Props = {
  disabledDates: string[] | [];
};

const ViewCalendar = ({ disabledDates }: Props) => {
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
        months={2}
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

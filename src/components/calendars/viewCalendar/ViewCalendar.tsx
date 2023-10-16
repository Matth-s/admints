import React from 'react';
import { DateRangePicker } from 'react-date-range';

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

  console.log(disabledDateRanges);

  return (
    <div className="view-calendar-container">
      <DateRangePicker
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
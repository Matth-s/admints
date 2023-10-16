import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { eachDayOfInterval, format } from 'date-fns';

import { Booking } from '../../../schema/booking-schema';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import './style.scss';

type Props = {
  disabledDates: string[] | [];

  setDataForm: React.Dispatch<React.SetStateAction<Booking>>;
};

const BookingCalendar = ({ disabledDates, setDataForm }: Props) => {
  const [dateSelected, setDateSelected] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const disabledDateRanges =
    disabledDates.length > 0
      ? disabledDates.map((item) => {
          return new Date(item);
        })
      : [];

  const handleDateChange = (ranges: any) => {
    const startDate = ranges.selection.startDate;
    const endDate = ranges.selection.endDate;
    const datesBetween = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
    const arrayOfDate = datesBetween.map((date) =>
      format(date, 'yyyy-MM-dd')
    );

    console.log(arrayOfDate);
    setDataForm((prev) => {
      return {
        ...prev,
        bookingDates: [...arrayOfDate],
      };
    });
    setDateSelected([
      {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
      },
    ]);
  };

  return (
    <div className="booking-calendar-container">
      <DateRangePicker
        onChange={(e) => handleDateChange(e)}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={dateSelected}
        disabledDates={disabledDateRanges}
        minDate={new Date()}
        direction="horizontal"
        staticRanges={[]}
        inputRanges={[]}
      />
    </div>
  );
};

export default BookingCalendar;

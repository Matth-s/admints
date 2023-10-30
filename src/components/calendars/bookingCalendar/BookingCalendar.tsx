import React, { useEffect, useMemo, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { eachDayOfInterval, format } from 'date-fns';

import { Booking } from '../../../schema/booking-schema';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import './style.scss';

type Props = {
  disabledDates: string[] | [];
  setDataForm: React.Dispatch<React.SetStateAction<Booking>>;
  selectedDate: string[] | [];
};

const BookingCalendar = ({
  disabledDates,
  setDataForm,
  selectedDate,
}: Props) => {
  let orientation: string = 'vertical';

  const selectedDateProps = useMemo(() => {
    return selectedDate;
  }, []);

  const [dateSelected, setDateSelected] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    if (selectedDateProps.length > 0) {
      let firstDateStr = selectedDateProps[0];
      let lastDateStr =
        selectedDateProps[selectedDateProps.length - 1];

      const firstDate = new Date(firstDateStr);
      const lastDate = new Date(lastDateStr);

      setDateSelected([
        {
          startDate: firstDate,
          endDate: lastDate,
          key: 'selection',
        },
      ]);
    }
  }, []);

  const disabledDateRanges = () => {
    if (selectedDate.length === 0) {
      return disabledDates.map((item) => new Date(item));
    } else {
      const selectedDateStrings = selectedDateProps as string[];
      return disabledDates
        .filter((date) => !selectedDateStrings.includes(date))
        .map((item) => new Date(item));
    }
  };

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
        disabledDates={disabledDateRanges()}
        minDate={new Date()}
        direction="horizontal"
        staticRanges={[]}
        inputRanges={[]}
      />
    </div>
  );
};

export default BookingCalendar;

import { Booking } from '../schema/booking-schema';

export default function bookingSum(booking: Booking) {
  const {
    pricePerDay,
    bookingDates,
    downPayment,
    providedMaterialsBooking,
    coachingTime,
    coachingPriceHour,
  } = booking;

  const sumBooking =
    bookingDates.length > 0
      ? bookingDates.length * pricePerDay
      : pricePerDay;

  const materialSum =
    providedMaterialsBooking.length > 0
      ? providedMaterialsBooking
          .map((item) => {
            return item.price * item.quantity;
          })
          .reduce((acc, curr) => acc + curr, 0)
      : 0;

  const coachingSum = coachingTime * coachingPriceHour;

  const finalSum =
    materialSum + sumBooking + downPayment + coachingSum;

  return finalSum;
}

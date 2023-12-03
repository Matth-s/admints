import React, { useState, useEffect } from 'react';

import { Booking } from '../../../schema/booking-schema';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import bookingSum from '../../../helpers/bookingSum';

import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormBookingSchema } from '../../../schema/checker-schema';

import MaterialBooking from '../../materialBooking/MaterialBooking';
import BookingCalendar from '../../calendars/bookingCalendar/BookingCalendar';

import {
  createBookingService,
  updateBookingService,
} from '../../../services/booking-service';

import './style.scss';

type Inputs = z.infer<typeof FormBookingSchema>;

type Props = {
  booking: Booking;
  isEditing: boolean;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookingForm = ({ booking, isEditing, setIsEditing }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token } = useAppSelector((state) => state.userSlice);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    values: booking,
    resolver: zodResolver(FormBookingSchema),
  });

  useEffect(() => {
    const total = bookingSum(watch());
    setValue('total', total);
  }, [
    watch('providedMaterialsBooking'),
    watch('coachingTime'),
    watch('bookingDates'),
  ]);

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    if (isEditing) {
      await dispatch(updateBookingService({ token, booking: data }))
        .unwrap()
        .then((res: number) => {
          if (res === 200 && setIsEditing) {
            setIsEditing(false);
            reset();
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    } else {
      await dispatch(createBookingService({ booking: data, token }))
        .unwrap()
        .then((res: number) => {
          if (res === 201) {
            navigate(`/view-booking/${data.id}`);
            reset();
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className="form-container">
      <h2>
        {isEditing
          ? `Modification de réservation pour '${watch(
              'materialName'
            )}'`
          : `Nouvelle réservation pour '${watch('materialName')}'`}
      </h2>

      <form onSubmit={handleSubmit(processForm)}>
        <div className="part-div flex flex__spaceBetween">
          <div className="left-part">
            <h3>Renseignement</h3>
            <div className="form-div">
              <label htmlFor="lastName">Nom</label>
              <input
                type="text"
                id="lastName"
                defaultValue={booking.lastName}
                {...register('lastName')}
              />
              {errors.lastName?.message && (
                <p className="error-message">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="form-div">
              <label htmlFor="firstName">Prénom</label>
              <input
                type="text"
                id="firstName"
                defaultValue={booking.firstName}
                {...register('firstName')}
              />
              {errors.firstName?.message && (
                <p className="error-message">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="form-div">
              <label htmlFor="phone">Téléphone</label>
              <input
                type="tel"
                id="phone"
                {...register('phone')}
                defaultValue={booking.phone}
              />
              {errors.phone?.message && (
                <p className="error-message">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="form-div">
              <label htmlFor="city">Ville</label>
              <input
                type="text"
                id="city"
                defaultValue={booking.city}
                {...register('city')}
              />
              {errors.city?.message && (
                <p className="error-message">{errors.city.message}</p>
              )}
            </div>

            <div className="form-div">
              <label htmlFor="street">Rue</label>
              <input
                type="text"
                id="street"
                defaultValue={booking.street}
                {...register('street')}
              />
              {errors.street?.message && (
                <p className="error-message">
                  {errors.street.message}
                </p>
              )}
            </div>

            <div className="form-div">
              <label htmlFor="coachingTime">
                Nombre d'heure de coaching
              </label>
              <input
                type="number"
                id="coachingTime"
                defaultValue={booking.coachingTime}
                {...register('coachingTime')}
              />
              {errors.coachingTime?.message && (
                <p className="error-message">
                  {errors.coachingTime.message}
                </p>
              )}
            </div>

            <div className="form-div">
              <p>Total : {watch('total')} €</p>
            </div>
          </div>

          <div className="right-part">
            <div className="top">
              <h3>Définir les dates de la location</h3>
              <BookingCalendar
                disabledDates={watch('unavailableDates')}
                setValue={setValue}
                selectedDate={watch('bookingDates')}
              />
            </div>

            <div className="down">
              <h3>Matériel à founir</h3>
              <MaterialBooking
                providedMaterials={watch('providedMaterialsBooking')}
                setValue={setValue}
              />
            </div>
          </div>
        </div>

        <input
          className={isLoading ? 'isLoading' : ''}
          type="submit"
          value={isEditing ? 'Modifier' : 'Enregistrer'}
        />
      </form>
    </div>
  );
};

export default BookingForm;

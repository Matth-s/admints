import React, { useState, useEffect } from 'react';

import { Booking } from '../../../schema/booking-schema';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/store';

import MaterialBooking from '../../materialBooking/MaterialBooking';
import BookingCalendar from '../../calendars/bookingCalendar/BookingCalendar';

import {
  createBookingService,
  updateBookingService,
} from '../../../services/booking-service';

import './style.scss';

type Props = {
  booking: Booking;
  isEditing: boolean;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookingForm = ({ booking, isEditing, setIsEditing }: Props) => {
  const [dataForm, setDataForm] = useState<Booking>(booking);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    const materialTotal: number =
      dataForm.providedMaterialsBooking.length > 0
        ? dataForm.providedMaterialsBooking.reduce((total, item) => {
            return total + item.total;
          }, 0)
        : 0;

    const bookingTotal: number =
      dataForm.bookingDates.length * dataForm.pricePerDay;

    const coachingTotal: number =
      dataForm.coachingTime * dataForm.coachingPriceHour;

    setDataForm((prev) => ({
      ...prev,
      total:
        materialTotal +
        bookingTotal +
        coachingTotal +
        dataForm.downPayment,
    }));
  }, [
    dataForm.providedMaterialsBooking,
    dataForm.bookingDates,
    dataForm.coachingTime,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDataForm((prev) => {
      if (name === 'coachingTime') {
        return {
          ...prev,
          coachingTime: value === '' ? 0 : parseInt(value),
        };
      }
      return {
        ...prev,
        [name]: value.trim(),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isEditing) {
      await dispatch(
        updateBookingService({ token, booking: dataForm })
      )
        .unwrap()
        .then((res: number) => {
          if (res === 200 && setIsEditing) {
            setIsEditing(false);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    } else {
      await dispatch(
        createBookingService({ booking: dataForm, token })
      )
        .unwrap()
        .then((res: number) => {
          if (res === 201) {
            navigate(`/view-booking/${dataForm.id}`);
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
          ? `Modification de réservation pour '${dataForm.materialName}'`
          : `Nouvelle réservation pour '${dataForm.materialName}'`}
      </h2>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="part-div flex flex__spaceBetween">
          <div className="left-part">
            <h3>Renseignement</h3>
            <div className="form-div">
              <label htmlFor="lastName">Nom</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                defaultValue={dataForm.lastName}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-div">
              <label htmlFor="firstName">Prénom</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                defaultValue={dataForm.firstName}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-div">
              <label htmlFor="phone">Numéro de téléphone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                defaultValue={dataForm.phone}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-div">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                defaultValue={dataForm.email}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-div">
              <label htmlFor="city">Ville</label>
              <input
                type="text"
                name="city"
                id="city"
                defaultValue={dataForm.city}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-div">
              <label htmlFor="street">Rue</label>
              <input
                type="text"
                name="street"
                id="street"
                defaultValue={dataForm.street}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-div">
              <label htmlFor="coachingTime">
                Nombre d'heure de coaching
              </label>
              <input
                type="number"
                name="coachingTime"
                id="coachingTime"
                defaultValue={dataForm.coachingTime}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-div">
              <p>Total : {dataForm.total} €</p>
            </div>
          </div>

          <div className="right-part">
            <div className="top">
              <h3>Définir les dates de la location</h3>
              <BookingCalendar
                disabledDates={dataForm.unavailableDates}
                setDataForm={setDataForm}
                selectedDate={dataForm.bookingDates}
              />
            </div>

            <div className="down">
              <h3>Matériel à founir</h3>
              <MaterialBooking
                providedMaterials={dataForm.providedMaterialsBooking}
                setFormData={setDataForm}
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

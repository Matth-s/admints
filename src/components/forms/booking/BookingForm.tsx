import React, { useState, useEffect } from 'react';

import { Booking } from '../../../schema/booking-schema';

import MaterialBooking from '../../materialBooking/MaterialBooking';
import BookingCalendar from '../../calendars/bookingCalendar/BookingCalendar';

import './style.scss';

type Props = {
  booking: Booking;
};

const BookingForm = ({ booking }: Props) => {
  const [dataForm, setDataForm] = useState<Booking>(booking);

  console.log(dataForm);

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
      total: materialTotal + bookingTotal + coachingTotal,
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

    console.log('submit');
  };

  return (
    <div className="form-container">
      <h2>Nouvelle réservation pour '{dataForm.materialName}'</h2>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="part-div flex flex__spaceBetween">
          <div className="left-part">
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
              />
            </div>

            <div className="down">
              <h3>Matériel founit</h3>
              <MaterialBooking
                providedMaterials={dataForm.providedMaterialsBooking}
                setFormData={setDataForm}
              />
            </div>
          </div>
        </div>

        <input type="submit" value="Enregistrer" />
      </form>
    </div>
  );
};

export default BookingForm;

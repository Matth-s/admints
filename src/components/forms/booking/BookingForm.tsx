import React, { useState } from 'react';

import { Booking } from '../../../schema/booking-schema';

import './style.scss';

type Props = {
  booking: Booking;
};

const BookingForm = ({ booking }: Props) => {
  const [dataForm, setDataForm] = useState<Booking>(booking);

  console.log(dataForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDataForm((prev) => {
      return {
        ...prev,
        [name]: value.trim(),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
                defaultValue={dataForm.total}
              />
            </div>

            <div className="form-div">
              <label htmlFor="total">Total</label>
              <input
                type="number"
                name="total"
                id="total"
                disabled
                defaultValue={dataForm.total}
              />
            </div>
          </div>
          <div className="right-part">
            <div className="top">
              <h3>Définir les dates de la location</h3>
            </div>
            <div className="down">
              <h3>Matériel founit</h3>
            </div>
          </div>
        </div>

        <input type="submit" value="Enregistrer" />
      </form>
    </div>
  );
};

export default BookingForm;

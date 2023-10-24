import { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { toast } from 'react-toastify';

import {
  getBookingById,
  getUnavailableDatesService,
  markAsPaidService,
} from '../../services/booking-service';

import { useParams } from 'react-router-dom';

import Loader from '../../components/loader/Loader';
import Header from '../../components/header/Header';
import BookingNotFound from '../../components/bookingNotFound/BookingNotFound';
import ActionBooking from '../../components/actionBooking/ActionBooking';
import DeleteBookingModal from '../../components/modals/deleteBookingModal/DeleteBookingModal';
import ViewPdfModal from '../../components/modals/viewPdfModal/ViewPdfModal';
import BookingForm from '../../components/forms/booking/BookingForm';
import BookingInformation from '../../components/bookingInformartion/BookingInformation';

import './style.scss';
import 'react-toastify/dist/ReactToastify.css';

const ViewBookingPage = () => {
  const { id } = useParams();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>();

  const [openModalDelete, setOpenModalDelete] =
    useState<boolean>(false);
  const [isEditing, setIsditing] = useState<boolean>(false);
  const [openModalPdf, setOpenModalPdf] = useState<boolean>(false);
  const [unavailableDatesLoading, setUnavailableDatesLoading] =
    useState<boolean>(true);

  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.userSlice);
  const { viewBooking } = useAppSelector(
    (state) => state.bookingSlice
  );

  const getBooking = async (id: string) => {
    await dispatch(getBookingById({ id, token }))
      .unwrap()
      .then()
      .catch((error) => {
        if (error.message.includes(404)) {
          setNotFound(true);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const getUnavailableDates = async (id: string) => {
    await dispatch(getUnavailableDatesService({ id, token }))
      .then(() => setUnavailableDatesLoading(false))
      .catch((error) => console.log(error));
  };

  const handleMarkAsPaid = () => {
    if (viewBooking) {
      dispatch(
        markAsPaidService({ id: viewBooking.id as string, token })
      )
        .unwrap()
        .then((res: number) => {
          if (res === 200) {
            toast.success('Réservation marqué comme payé', {
              position: 'bottom-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          }
        })
        .catch(() => {
          toast.error(
            'Une erreur est survenue lors de la mise a jour',
            {
              position: 'bottom-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            }
          );
        });
    }
  };

  useEffect(() => {
    if (!viewBooking) {
      setIsLoading(true);
      getBooking(id as string);
    }

    if (isEditing && viewBooking) {
      setUnavailableDatesLoading(true);
      getUnavailableDates(viewBooking.idMaterial as string);
    }
  }, [isEditing]);

  if (notFound) {
    return (
      <>
        <Header />
        <BookingNotFound />
      </>
    );
  }

  return (
    <section className="view-booking-container">
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        viewBooking && (
          <div className="view-booking-content">
            <ActionBooking
              setOpenModalDelete={setOpenModalDelete}
              setIsditing={setIsditing}
              setOpenModalPdf={setOpenModalPdf}
              handleMarkAsPaid={handleMarkAsPaid}
              isPaid={viewBooking.isCompleted}
            />

            {isEditing ? (
              unavailableDatesLoading ? (
                <p>Chargement des dates</p>
              ) : (
                <BookingForm
                  isEditing={true}
                  booking={viewBooking}
                  setIsEditing={setIsditing}
                />
              )
            ) : (
              <>
                <BookingInformation booking={viewBooking} />

                {openModalDelete &&
                  createPortal(
                    <DeleteBookingModal
                      closeModal={() => setOpenModalDelete(false)}
                      booking={viewBooking}
                    />,
                    document.body
                  )}

                {openModalPdf &&
                  createPortal(
                    <ViewPdfModal
                      closeModal={() => setOpenModalPdf(false)}
                      booking={viewBooking}
                    />,
                    document.body
                  )}
              </>
            )}
          </div>
        )
      )}
    </section>
  );
};

export default ViewBookingPage;

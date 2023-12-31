import { Routes, Route, Navigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './store/store';
import { checkUserStatusService } from './services/auth-service';
import { getAllMaterialService } from './services/material-service';
import { getAllBookingService } from './services/booking-service';
import { ToastContainer } from 'react-toastify';

import PrivateRoute from './utils/PrivateRoutes';
import SignUp from './pages/signUp/SignUpPage';
import Home from './pages/home/Home';
import CreateMaterialPage from './pages/createMaterial/CreateMaterialPage';
import ViewMaterialPage from './pages/viewMaterial/ViewMaterialPage';
import Loader from './components/loader/Loader';
import BookingPage from './pages/booking/BookingPage';
import CreateBookingPage from './pages/createBooking/CreateBookingPage';
import ViewBookingPage from './pages/viewBooking/ViewBookingPage';
import MessagingPage from './pages/messaging/MessagingPage';
import { getAllMessagingService } from './services/messaging-service';
import ViewMessage from './pages/viewMessage/ViewMessage';

function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [materialLoading, setIsMaterialLoading] =
    useState<boolean>(true);
  const [bookingLoading, setBookingLoading] = useState<boolean>(true);
  const [messaginLoading, setMessagingLoading] =
    useState<boolean>(true);

  const { token } = useAppSelector((state) => state.userSlice);

  const checkUser = async () => {
    await dispatch(checkUserStatusService())
      .unwrap()
      .then()
      .catch((error) => console.log(error, 'checkuser error'))
      .finally(() => setIsLoading(false));
  };

  const getMaterial = async () => {
    await dispatch(getAllMaterialService())
      .unwrap()
      .then()
      .catch(() => console.log('rror'))
      .finally(() => setIsMaterialLoading(false));
  };

  const getBooking = async () => {
    await dispatch(getAllBookingService({ token }))
      .unwrap()
      .then()
      .catch((error) => console.log(error, 'bookingError'))
      .finally(() => setBookingLoading(false));
  };

  const getMessaging = async () => {
    dispatch(getAllMessagingService({ token }))
      .catch((error) => console.log(error))
      .finally(() => setMessagingLoading(false));
  };

  useEffect(() => {
    checkUser();

    if (token) {
      getMaterial();
      getBooking();
      getMessaging();
    }
  }, [token]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route
                path="/material"
                element={<Home isLoading={materialLoading} />}
              />
              <Route
                path="/create-material"
                element={<CreateMaterialPage />}
              />
              <Route
                path="/view-material/:id"
                element={<ViewMaterialPage />}
              />
              <Route
                path="/booking"
                element={<BookingPage isLoading={bookingLoading} />}
              />
              <Route
                path="/create-booking/:id"
                element={<CreateBookingPage />}
              />
              <Route
                path="/view-booking/:id"
                element={<ViewBookingPage />}
              />
              <Route path="/" element={<Navigate to="/material" />} />

              <Route
                path="/messaging"
                element={
                  <MessagingPage isLoading={messaginLoading} />
                }
              />

              <Route
                path="/messaging/view-message/:id"
                element={<ViewMessage />}
              />
            </Route>

            <Route
              path="/material"
              element={<Navigate to="/home" />}
            />

            <Route path="/signup" element={<SignUp />} />
          </Routes>
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default App;

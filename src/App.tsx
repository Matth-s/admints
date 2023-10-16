import { Routes, Route, Navigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './store/store';
import { checkUserStatusService } from './services/auth-service';
import { getAllMaterialService } from './services/material-service';

import PrivateRoute from './utils/PrivateRoutes';
import SignUp from './pages/signUp/SignUpPage';
import Home from './pages/home/Home';
import CreateMaterialPage from './pages/createMaterial/CreateMaterialPage';
import ViewMaterialPage from './pages/viewMaterial/ViewMaterialPage';

import Loader from './components/loader/Loader';
import BookingPage from './pages/booking/BookingPage';
import { getAllBookingService } from './services/booking-service';
import CreateBookingPage from './pages/createBooking/CreateBookingPage';

function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [materialLoading, setIsMaterialLoading] =
    useState<boolean>(true);
  const [bookingLoading, setBookingLoading] = useState<boolean>(true);

  const { token } = useAppSelector((state) => state.userSlice);

  const checkUser = async () => {
    try {
      await dispatch(checkUserStatusService());
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const getMaterial = async () => {
    await dispatch(getAllMaterialService())
      .unwrap()
      .then()
      .catch((error) => console.log(error))
      .finally(() => setIsMaterialLoading(false));
  };

  const getBooking = async () => {
    await dispatch(getAllBookingService({ token }))
      .unwrap()
      .then()
      .catch((error) => console.log(error))
      .finally(() => setBookingLoading(false));
  };

  useEffect(() => {
    checkUser();
    getMaterial();
    if (token) {
      getBooking();
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
                path="/create-booking"
                element={<CreateBookingPage />}
              />
            </Route>

            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/signup" />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;

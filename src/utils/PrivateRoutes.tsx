import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/store';

const PrivateRoute = () => {
  const { isAuthenticated } = useAppSelector(
    (state) => state.userSlice
  );

  return isAuthenticated ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoute;

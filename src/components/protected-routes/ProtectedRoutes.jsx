import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ loggedIn }) => {
  return loggedIn ? <Outlet /> : <Navigate to='/signin' />;
};

export default ProtectedRoutes;

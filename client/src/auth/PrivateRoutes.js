import { Navigate } from 'react-router-dom';
import { useUser } from './useUser';

export const PrivateRoutes = ({ children }) => {
  const [user] = useUser();
  return user ? children : <Navigate to="/login" />;
};

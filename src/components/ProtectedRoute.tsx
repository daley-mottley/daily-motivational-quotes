import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const userContext = useContext(UserContext);

  if (!userContext?.user) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;

import React, { useContext } from 'react'
import { AuthContext } from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    console.log("Not logged in so navigating to login page");
    return <Navigate to={"/login"} />
  }
  return children;
}

export default ProtectedRoute
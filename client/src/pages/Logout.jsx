import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';

function Logout() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    setCurrentUser(null);
    navigate('/login');
  }, []);

  return (
    <div>Logout</div>
  )
}

export default Logout
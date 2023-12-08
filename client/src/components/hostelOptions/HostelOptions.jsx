import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function HostelOptions() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetRoom = () => {
    navigate("/dashboard/getRoom")
    console.log("Getting room")
  }

  const handleChangeRoom = () => {
    navigate("/dashboard/changeRoom")
    console.log("Changing room")
  }

  const handleLeaveHostel = () => {
    navigate("/dashboard/leaveHostel")
    console.log("Leaving hostel")
  }
  return (
    <>
      <button onClick={handleGetRoom} className="btn btn-outline-primary w-1/3" disabled={currentUser.hosteller}>Get Hostel Room</button>
      <button onClick={handleChangeRoom} className="btn btn-outline-primary w-1/3" disabled={!currentUser.hosteller}>Change Room</button>
      <button onClick={handleLeaveHostel} className="btn btn-outline-primary w-1/3" disabled={!currentUser.hosteller}>Leave Hostel</button>
    </>
  )
}

export default HostelOptions
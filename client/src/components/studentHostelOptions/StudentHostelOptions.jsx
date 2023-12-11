import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function HostelOptions() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetRoom = () => {
    navigate("/dashboard/get-room")
    console.log("Getting room")
  }

  const handleChangeRoom = () => {
    navigate("/dashboard/change-room")
    console.log("Changing room")
  }

  const handleLeaveRoom = () => {
    navigate("/dashboard/leave-room")
    console.log("Leaving room")
  }
  return (
    <>
      {!(currentUser.roomAllocated) &&
        <button onClick={handleGetRoom} className="btn btn-outline-primary w-1/3">Get Room</button>
      }
      {
        currentUser.roomAllocated &&
        <button onClick={handleChangeRoom} className="btn btn-outline-success w-1/3">Change Room</button>
      }
      {
        currentUser.roomAllocated &&
        <button onClick={handleLeaveRoom} className="btn btn-outline-danger w-1/3">Leave Room</button>
      }
    </>
  )
}

export default HostelOptions
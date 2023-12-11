import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

function LeaveHostel() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  
  const handleLeaveHostel = () => {
    setCurrentUser({ ...currentUser, hosteller: false })
    console.log("Leave hostel")
    navigate("/dashboard")
  }

  return (
    <div>
      <h2 className='font-bold'>Leave Hostel</h2>
      <div>
        <p>Are you sure you want to leave the hostel?</p>
        <button className="btn btn-outline-primary" onClick={handleLeaveHostel}>
          Yes
        </button>
      </div>
    </div>
  )
}

export default LeaveHostel
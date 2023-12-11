import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

function LeaveRoom() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("")
  
  const handleLeaveRoom = () => {
    const leaveRoom = async () => {
      const res = await fetch(`http://localhost:8080/api/hostel/students/${currentUser.student_id}/room`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        }
      })
      const data = await res.json()
      console.log(data)
      if (data.success) {
        setCurrentUser({ ...currentUser, roomAllocated: false })
        navigate("/dashboard")
      } else {
        console.log(data.error)
        alert(data.error) 
      }
    }
    leaveRoom()
  }

  return (
    <div>
      <h2 className='font-bold'>Leave Room</h2>
      <div>
        <p>Are you sure you want to leave the room?</p>
        <button className="btn btn-outline-primary" onClick={handleLeaveRoom}>
          Yes
        </button>
      </div>
      {errMsg && <p className="text-red-500">{errMsg}</p>}
    </div>
  )
}

export default LeaveRoom
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function AddRoom() {
  const { currentUser } = useContext(AuthContext);

  const [roomId, setRoomId] = useState(null)
  const [floor, setFloor] = useState(null)
  const [beds, setBeds] = useState(null)
  const [ac, setAc] = useState(null)

  const { token } = currentUser
  const navigate = useNavigate();

  const handleAddRoom = () => {
    const addRoom = async () => {
      // post request to add room
      const response = await fetch(`http://localhost:8080/api/hostel/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          roomId,
          floor,
          beds,
          ac
        })
      });
      const data = await response.json();
      console.log(data)
      if (data.success) {
        console.log("Room added")
      } else {
        console.log("Room not added")
        alert(data.message)
      }
    }
    addRoom();
    console.log("Added room")
    handleBackToDashboard()
  }
  
  const handleBackToDashboard = () => {
    console.log("Back to dashboard")
    navigate("/dashboard")
  }

  return (
    <div className="bg-body-primary border-2 h-full w-2/3 flex flex-col justify-center align-center p-4">
      <h2 className='mb-4 font-bold text-xl'>Add Room</h2>
      <table className='text-left border border-separate border-spacing-2'>
        <tbody>
          <tr>
            <td>
              <p>Room ID:</p>
            </td>
            <td>
              <input type="text" value={roomId} onChange={e => setRoomId(e.target.value)} className='border-2' />
            </td>
          </tr>
          <tr>
            <td>
              <p>Floor:</p>
            </td>
            <td>
              <input type="text" value={floor} onChange={e => setFloor(e.target.value)} className='border-2' />
            </td>
          </tr>
          <tr>
            <td>
              <p>Beds:</p>
            </td>
            <td>
              <input type="text" value={beds} onChange={e => setBeds(e.target.value)} className='border-2' />
            </td>
          </tr>
          <tr>
            <td>
              <p>AC:</p>
            </td>
            <td>
              <input type="text" value={ac} onChange={e => setAc(e.target.value)} className='border-2' />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleAddRoom} className='btn btn-outline-primary mt-4'>Add Room</button>
    </div>
  )
}

export default AddRoom
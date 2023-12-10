import React, { useContext, useEffect, useState } from 'react'
import roomsData from './roomsData';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function ChangeRoom() {

  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    // const response = await fetch("http://localhost:5000/rooms");
    // const data = await response.json();
    // setRooms(data);

    // [
    //   {
    //     "roomId": 1,
    //     "floorNo": 1,
    //     "numberOfBeds": 2,
    //     "availableBeds": 1,
    //     "ac": true
    //   }  
    // ]

    setRooms(roomsData);
  }, [])

  const handleChangeRoom = (roomId) => {
    console.log("Change room", roomId)
    setCurrentUser({
      ...currentUser,
      room: roomId,
      hosteller: true
    })
    navigate("/dashboard")
  }

  return (
    <>
      <h2 className='font-bold'>Change Room</h2>
      <div className='overflow-y-auto flex flex-col gap-2 w-full'>
        {
          rooms.map((room) =>
          (
            <table className='text-left border border-separate border-spacing-2' key={room.room_id}>
              <tbody>
                <tr>
                  <td>
                    <p>Room ID:</p>
                  </td>
                  <td>
                    <p>{room.room_id}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Floor:</p>
                  </td>
                  <td>
                    <p>{room.floor}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Number of Beds:</p>
                  </td>
                  <td>
                    <p>{room.beds}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Available Beds:</p>
                  </td>
                  <td>
                    <p>{room.availableBeds}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>AC Room:</p>
                  </td>
                  <td>
                    <p>{room.ac ? "Yes" : "No"}</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className='flex justify-center'>
                    <button onClick={() => handleChangeRoom(room.room_id)} className='btn btn-outline-primary m-auto'>Switch to this Room</button>
                  </td>
                </tr>
              </tbody>
            </table>
          )
          )
        }
      </div>
    </>
  )
}

export default ChangeRoom
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import roomsData from './roomsData';
import { useNavigate } from 'react-router-dom';

function GetRoom() {

  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const [rooms, setRooms] = useState([]);
  const [acFilter, setAcFilter] = useState("DEFAULT")
  const [floorFilter, setFloorFilter] = useState("DEFAULT")
  const [bedsFilter, setBedsFilter] = useState("DEFAULT")

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

    let newRoomsData = roomsData;
    if (acFilter != "DEFAULT") {
      newRoomsData = newRoomsData.filter(room => room.ac == (acFilter == "true"))
    }
    if (floorFilter != "DEFAULT") {
      newRoomsData = newRoomsData.filter(room => room.floorNo == floorFilter)
    }
    if (bedsFilter != "DEFAULT") {
      newRoomsData = newRoomsData.filter(room => room.numberOfBeds == bedsFilter)
    }
    setRooms(newRoomsData);

  }, [acFilter, floorFilter, bedsFilter])

  const handleGetRoom = (roomId) => {
    console.log("Get room", roomId)
    setCurrentUser({
      ...currentUser,
      room: roomId,
      hosteller: true
    })
    navigate("/dashboard")
  }

  const handleClearFilters = () => {
    setAcFilter("DEFAULT")
    setFloorFilter("DEFAULT")
    setBedsFilter("DEFAULT")
  }

  return (
    <>
      <h2 className='font-bold'>Get Room</h2>
      <h3 className='w-full text-left'>Filters:</h3>
      <div className='w-full flex justify-around flex-wrap gap-2'>
        <select value={floorFilter} onChange={e => setFloorFilter(e.target.value)} className='border border-gray-400 rounded-md'>
          <option value="DEFAULT">Any floor</option>
          <option value="1">1st Floor</option>
          <option value="2">2nd Floor</option>
          <option value="3">3rd Floor</option>
          <option value="4">4th Floor</option>
        </select>
        <select value={acFilter} onChange={e => setAcFilter(e.target.value)} className='border border-gray-400 rounded-md'>
          <option value="DEFAULT">Both AC & Non-AC</option>
          <option value={true}>AC</option>
          <option value={false}>Non-AC</option>
        </select>
        <select value={bedsFilter} onChange={e => setBedsFilter(e.target.value)} className='border border-gray-400 rounded-md'>
          <option value="DEFAULT">Any number of beds</option>
          <option value="2">2 Beds</option>
          <option value="3">3 Beds</option>
          <option value="4">4 Beds</option>
        </select>
        <button onClick={handleClearFilters} className='btn btn-outline-primary'>Clear filters</button>
      </div>
      <div className='overflow-y-auto flex flex-col gap-2 w-full'>
        {
          rooms.map((room) =>
          (
            <table className='text-left border border-separate border-spacing-2' key={room.roomId}>
              <tbody>
                <tr>
                  <td>
                    <p>Room ID:</p>
                  </td>
                  <td>
                    <p>{room.roomId}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Floor:</p>
                  </td>
                  <td>
                    <p>{room.floorNo}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Number of Beds:</p>
                  </td>
                  <td>
                    <p>{room.numberOfBeds}</p>
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
                    <button onClick={() => handleGetRoom(room.roomId)} className='btn btn-outline-primary m-auto'>Get Room</button>
                  </td>
                </tr>
              </tbody>
            </table>
          ))
        }
      </div>
    </>
  )
}

export default GetRoom
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

function ViewRooms() {
  const { currentUser } = useContext(AuthContext);
  const { token } = currentUser;

  const [rooms, setRooms] = useState([])
  const [acFilter, setAcFilter] = useState("DEFAULT")
  const [floorFilter, setFloorFilter] = useState("DEFAULT")
  const [bedsFilter, setBedsFilter] = useState("DEFAULT")

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchRooms = async () => {
      if (!token) return;
      let url = "http://localhost:8080/api/hostel/rooms"
      if (acFilter != "DEFAULT" || floorFilter != "DEFAULT" || bedsFilter != "DEFAULT") {
        url += "?"
      }
      if (acFilter != "DEFAULT") {
        url += `&ac=${acFilter}`
      }
      if (floorFilter != "DEFAULT") {
        url += `&floor=${floorFilter}`
      }
      if (bedsFilter != "DEFAULT") {
        url += `&beds=${bedsFilter}`
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log(data)
      setRooms(data.data);
    }
    fetchRooms();
  }, [acFilter, floorFilter, bedsFilter])

  const handleViewRoom = (roomId) => {
    console.log("View room", roomId)
    navigate("/dashboard/hostel/room/" + roomId)
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
          <option value="1">1 Bed</option>
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
                  <button onClick={() => handleViewRoom(room.room_id)} className='btn btn-outline-primary m-auto'>View Room</button>
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

export default ViewRooms
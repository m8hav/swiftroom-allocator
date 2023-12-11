import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { getUserDetails } from '../../utils/auth';
import { useParams } from 'react-router-dom';

function Room() {
  let { id } = useParams();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { token } = currentUser;
  const [room, setRoom] = useState({})

  useEffect(() => {
    const fetchRoom = async () => {
      const response = await fetch(`http://localhost:8080/api/hostel/rooms/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log(data)
      setRoom(data.data);
    }
    fetchRoom();
  }, [id])

  return (
    <div className='flex flex-col h-full overflow-y-auto w-full'>
      <table className='text-left border border-separate border-spacing-2'>
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
        </tbody>
      </table>
      <h2 className='mt-4 my-2 font-bold'>Students in Room</h2>
      {
        room.studentsInRoom &&
        room.studentsInRoom.map((student, index) =>
        (
          <table className='text-left border border-separate border-spacing-2'>
            <h2 className='text-left font-bold mt-4 my-2'>{index + 1}</h2>
            <tbody>
              <tr>
                <td>
                  <p>Student ID:</p>
                </td>
                <td>
                  <p>{student.student_id}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Name:</p>
                </td>
                <td>
                  <p>{student.name}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Email:</p>
                </td>
                <td>
                  <p>{student.email}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Phone:</p>
                </td>
                <td>
                  <p>{student.phone}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>State:</p>
                </td>
                <td>
                  <p>{student.state}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Batch:</p>
                </td>
                <td>
                  <p>{student.batch}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Course:</p>
                </td>
                <td>
                  <p>{student.course}</p>
                </td>
              </tr>
            </tbody>
          </table>
        ))
      }
    </div>
  )
}

export default Room
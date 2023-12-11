import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function StudentInfoPanel() {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEditUserInfo = () => {
    console.log("Edit student info")
    navigate("/dashboard/edit-user-info")
  }

  const handleDeleteStudentHostelAccount = () => {
    console.log("Delete hostel account")
    navigate("/dashboard/delete-student-hostel-account")
  }

  return (
    <div className="bg-body-primary border-2 h-full w-1/3 flex flex-col justify-center align-center p-4">
      <h2 className='mb-4 font-bold text-xl'>User Info</h2>
      <table className='text-left border border-separate border-spacing-2'>
        <tbody>
          <tr>
            <td>
              <p>ID:</p>
            </td>
            <td>
              <p>{currentUser.student_id}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>User Type:</p>
            </td>
            <td>
              <p>{currentUser.type}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Name:</p>
            </td>
            <td>
              <p>{currentUser.name}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Email:</p>
            </td>
            <td>
              <p>{currentUser.email}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Phone:</p>
            </td>
            <td>
              <p>{currentUser.phone}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Batch:</p>
            </td>
            <td>
              <p>{currentUser.batch}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Course:</p>
            </td>
            <td>
              <p>{currentUser.course}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>State:</p>
            </td>
            <td>
              <p>{currentUser.state}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Registered in Hostel</p>
            </td>
            <td>
              <p>{currentUser.registeredInHostel ? "Yes" : "No"}</p>
            </td>
          </tr>
          {
            currentUser.registeredInHostel &&
            <tr>
              <td>
                <p>Room Allocated</p>
              </td>
              <td>
                <p>{currentUser.roomAllocated ? "Yes" : "No"}</p>
              </td>
            </tr>
          }
          {
            currentUser.roomAllocated &&
            <tr>
              <td>
                <p>Room:</p>
              </td>
              <td>
                <p>{currentUser.roomDetails.room_id}</p>
              </td>
            </tr>
          }
        </tbody>
      </table>
      <button onClick={handleEditUserInfo} className='btn btn-outline-primary mt-4'>Edit User Info</button>
      <button onClick={handleDeleteStudentHostelAccount} className='btn btn-outline-danger mt-4'>Delete Student Hostel Account</button>
    </div>
  )
}

export default StudentInfoPanel
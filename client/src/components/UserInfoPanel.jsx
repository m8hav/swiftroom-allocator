import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function InfoPanel() {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  
  const handleEditUserInfo = () => {
    console.log("Edit user info")
    navigate("/dashboard/edit-user-info")
  }

  return (
    <div className="bg-body-primary border-2 h-full w-1/3 flex flex-col justify-center align-center p-4">
      <h2 className='mb-4 font-bold text-xl'>User Info</h2>
      <table className='text-left border border-separate border-spacing-2'>
        <tbody>
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
              <p>{currentUser.course + " " + currentUser.branch}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>City:</p>
            </td>
            <td>
              <p>{currentUser.city}</p>
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
              <p>Hosteller</p>
            </td>
            <td>
              <p>{currentUser.hosteller ? "Yes" : "No"}</p>
            </td>
          </tr>
          {
            currentUser.hosteller &&
            <tr>
              <td>
                <p>Room</p>
              </td>
              <td>
                <p>{currentUser.room}</p>
              </td>
            </tr>
          }
        </tbody>
      </table>
      <button onClick={handleEditUserInfo} className='btn btn-outline-primary mt-4'>Edit User Info</button>
    </div>
  )
}

export default InfoPanel
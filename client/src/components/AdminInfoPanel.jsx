import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function AdminInfoPanel() {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEditUserInfo = () => {
    console.log("Edit admin info")
    navigate("/dashboard/edit-user-info")
  }

  const handleDeleteAdminAccount = () => {
    const deleteAdminAccount = async () => {
      const response = await fetch(`http://localhost:8080/api/hostel/admins/${currentUser.hostel_admin_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentUser.token}`
        }
      });
      const data = await response.json();
      console.log(data)
    }
    deleteAdminAccount();
    navigate("/logout")
    console.log("Delete admin account")
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
              <p>{currentUser.hostel_admin_id}</p>
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
      <button onClick={handleDeleteAdminAccount} className='btn btn-outline-danger mt-4'>Delete Admin Account</button>
    </div>
  )
}

export default AdminInfoPanel
import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { saveUserDetails } from '../utils/auth';

function EditAdminInfoPanel() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState(currentUser.name)
  const [email, setEmail] = useState(currentUser.email)

  const { type, token } = currentUser

  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    console.log("Back to dashboard")
    navigate("/dashboard")
  }

  const handleSaveChanges = () => {
    const saveChanges = async () => {
      // put request to update admin details
      const response = await fetch(`http://localhost:8080/api/hostel/admins/${currentUser.hostel_admin_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentUser.token}`
        },
        body: JSON.stringify({
          name,
          email
        })
      });
      const data = await response.json();
      console.log(data.data)
      const fullUserDetails = { ...(data.data), type, token }
      setCurrentUser(fullUserDetails)
      saveUserDetails(fullUserDetails)
    }

    saveChanges();

    console.log("Edited admin info")
    handleBackToDashboard()
  }

  return (
    <div className="bg-body-primary border-2 h-full w-2/3 flex flex-col justify-center align-center p-4">
      <h2 className='mb-4 font-bold text-xl'>Edit User Info</h2>
      <table className='text-left border border-separate border-spacing-2'>
        <tbody>
          <tr>
            <td>
              <p>Name:</p>
            </td>
            <td>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className='border-2' />
            </td>
          </tr>
          <tr>
            <td>
              <p>Email:</p>
            </td>
            <td>
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} className='border-2' />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleSaveChanges} className='btn btn-outline-primary mt-4'>Save Changes</button>
      <button onClick={handleBackToDashboard} className='btn btn-outline-success mt-4'>Back to Dashboard</button>
    </div>
  )
}

export default EditAdminInfoPanel
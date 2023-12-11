import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function EditAdminInfoPanel() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState(currentUser.name)
  const [email, setEmail] = useState(currentUser.email)

  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    console.log("Back to dashboard")
    navigate("/dashboard")
  }

  const handleSaveChanges = () => {
    setCurrentUser({
      ...currentUser,
      name,
      batch,
      course,
      branch,
      city,
      state
    })
    console.log("Edited user info")
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
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';

function StudentDashboard() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <h2>Student Dashboard</h2>
      <div id="student-info">
        <p>{currentUser.name}</p>
        <p>{currentUser.name}</p>
      </div>
      <div id="hostel-options">

      </div>
    </div>
  )
}

export default StudentDashboard
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function AddStudent() {
  const [studentId, setStudentId] = useState("")

  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    console.log("Back to dashboard")
    navigate("/dashboard")
  }

  const handleAddStudent = () => {
    const addStudent = async () => {
      // post request to add student
      const response = await fetch('http://localhost:8080/api/hostel/students', {
        method: 'POST',
        body: JSON.stringify({ id: studentId, password: studentId }),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log(response)
      const data = await response.json();
      console.log(data)
      if (data.success) {
        console.log("Student added to hostel")
      } else {
        console.log("Student not added to hostel")
        alert(data.message)
      }
    }
    addStudent();
    console.log("Added student to hostel")
    handleBackToDashboard()
  }

  return (
    <div className="bg-body-primary border-2 h-full w-5/6 flex flex-col justify-center align-center p-4">
      <h2 className='mb-4 font-bold text-xl'>Add Room</h2>
      <table className='text-left border border-separate border-spacing-2'>
        <tbody>
          <tr>
            <td>
              <p>Student ID:</p>
            </td>
            <td>
              <input type="text" value={studentId} onChange={e => setStudentId(e.target.value)} className='border-2' />
            </td>
          </tr>
        </tbody>
      </table>
      <h3 className='mt-2'>Note: Password will be same as the student's ID</h3>
      <button onClick={handleAddStudent} className='btn btn-outline-primary mt-4'>Add Student to Hostel</button>
    </div>
  )
}

export default AddStudent
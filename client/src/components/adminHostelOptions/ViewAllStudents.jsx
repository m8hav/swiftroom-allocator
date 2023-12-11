import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

function ViewAllStudents() {
  const { currentUser } = useContext(AuthContext)

  const { token } = currentUser;

  const [students, setStudents] = useState([])

  useEffect(() => {
    const fetchStudents = async () => {
      if (!token) return;
      const response = await fetch("http://localhost:8080/api/hostel/students", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log(data)
      setStudents(data.data);
    }
    fetchStudents();
  }, [])

  return (
    <div className='h-full'>
      {
        students &&
        students.map((student, index) => (
          <div className='flex flex-col justify overflow-auto'>
            <h2 className='text-left font-bold mt-4 my-2'>{index + 1}</h2>
            <table className='text-left border border-separate border-spacing-2'>
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
          </div>
        ))
      }
    </div>
  )
}

export default ViewAllStudents
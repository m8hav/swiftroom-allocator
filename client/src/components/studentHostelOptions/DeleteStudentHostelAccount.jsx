import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { removeUserDetails } from '../../utils/auth';

function DeleteStudentHostelAccount() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("")

  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    console.log("Back to dashboard")
    navigate("/dashboard")
  }

  const handleDeleteStudentHostelAccount = () => {
    const deleteStudentHostelAccount = async () => {
      const response = await fetch(`http://localhost:8080/api/hostel/students/${currentUser.student_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentUser.token}`
        }
      });
      const data = await response.json();
      console.log(response)
      console.log(data)
      if (data.success) {
        removeUserDetails();
        console.log("Deleted student hostel account")
        navigate("/login")
        setCurrentUser(null);
      } else {
        console.log(data.message)
        setErrMsg(data.message)
      }
    }
    deleteStudentHostelAccount();
  }

  return (
    <div>
      <h2 className='font-bold'>Delete Hostel Account</h2>
      <div>
        <p>Are you sure you want to delete your hostel account?</p>
        <button className="btn btn-outline-primary" onClick={handleDeleteStudentHostelAccount}>
          Yes
        </button>
      </div>
      {
        errMsg && <p className="text-red-500">{errMsg}</p>
      }
      <button onClick={handleBackToDashboard} className='btn btn-outline-success mt-4'>Back to Dashboard</button>
    </div>
  )
}

export default DeleteStudentHostelAccount
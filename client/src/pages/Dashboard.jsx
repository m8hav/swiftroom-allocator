import React, { useEffect } from 'react'
import { useContext } from "react";
import ProtectedRoute from "../ProtectedRoute"
import StudentDashboard from "../components/StudentDashboard"
import { AuthContext } from "../contexts/AuthContext";
import AdminDashboard from "../components/AdminDashboard";
import { Route, Routes } from 'react-router-dom';
import EditStudentInfoPanel from '../components/EditStudentInfoPanel';
import EditAdminInfoPanel from '../components/EditAdminInfoPanel';
import { getUserDetails } from '../utils/auth';
import DeleteStudentHostelAccount from '../components/studentHostelOptions/DeleteStudentHostelAccount';

function Dashboard() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  
  const MainDashboard = () => {
    return (
      <>
        {
          currentUser?.type.toLowerCase() == "student"
            ? <StudentDashboard />
            : <AdminDashboard />
        }
      </>
    )
  }

  return (
    <div className='flex justify-around items-center w-full h-full'>
      <ProtectedRoute>
        <Routes>
          <Route path='*' element={<MainDashboard />} />
          <Route path='delete-student-hostel-account' element={<DeleteStudentHostelAccount />} />
          <Route path='edit-user-info' element={
            currentUser.type === "student"
              ? <EditStudentInfoPanel />
              : <EditAdminInfoPanel />} />
        </Routes>
      </ProtectedRoute>
    </div>
  )
}

export default Dashboard


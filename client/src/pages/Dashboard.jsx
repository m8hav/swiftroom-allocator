import React from 'react'
import { useContext } from "react";
import ProtectedRoute from "../ProtectedRoute"
import StudentDashboard from "../components/StudentDashboard"
import { AuthContext } from "../contexts/AuthContext";
import AdminDashboard from "../components/AdminDashboard";
import InfoPanel from '../components/UserInfoPanel';
import { Route, Routes } from 'react-router-dom';
import EditUserInfo from '../components/EditUserInfoPanel';

function Dashboard() {
  const { currentUser } = useContext(AuthContext);

  const MainDashboard = () => {
    return (
      <>
        <InfoPanel />
        {
          currentUser?.type.toLowerCase() == "student"
            ? <StudentDashboard />
            : <AdminDashboard />
        }
      </>
    )
  }

  return (
    <ProtectedRoute>
      <Routes>
        <Route path='*' element={<MainDashboard />} />
        <Route path='edit-user-info' element={<EditUserInfo />} />
      </Routes>
    </ProtectedRoute>
  )
}

export default Dashboard


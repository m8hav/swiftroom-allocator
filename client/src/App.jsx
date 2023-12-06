import React, { useContext } from 'react'
import Logout from "./pages/Logout"
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './pages/Navbar'
import { AuthContext } from './contexts/AuthContext'
import StudentDashboard from './pages/StudentDashboard'
import Home from './pages/Home'
import ProtectedRoute from './ProtectedRoute'
import AdminDashboard from './pages/AdminDashboard'

function App() {

  const { currentUser } = useContext(AuthContext);

  const Dashboard = () => {
    return (
      <ProtectedRoute>
        {
          currentUser?.type.toLowerCase() == "student"
            ? <StudentDashboard />
            : <AdminDashboard />
        }
      </ProtectedRoute>
    )
  }
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />}></Route>
          <Route path='/logout' element={<Logout />}></Route>
        </Routes>
      </main>
    </>
  )
}

export default App
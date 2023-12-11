import React from 'react'
import Logout from "./pages/Logout"
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'

function App() {

  return (
    <>
      <Navbar />
      <main className='flex flex-column justify-center items-center gap-4 max-w-screen-lg m-auto h-full'>
        <Routes>
          <Route path='*'>
            <Route index element={<Home />} />
            <Route path='dashboard/*' element={<Dashboard />} />
            <Route path='login' element={<Login />}></Route>
            <Route path='register/*' element={<Register />}></Route>
            <Route path='logout' element={<Logout />}></Route>
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App
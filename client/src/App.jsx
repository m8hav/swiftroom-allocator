import React from 'react'
import Logout from "./pages/Logout"
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
      <Navbar />
      <main className='flex justify-around items-center max-w-screen-lg m-auto'>
        <Routes>
          <Route path='*'>
            <Route index element={<Home />} />
            <Route path='dashboard/*' element={<Dashboard />} />
            <Route path='login' element={<Login />}></Route>
            <Route path='logout' element={<Logout />}></Route>
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import RegisterStudent from '../components/RegisterStudent';
import RegisterAdmin from '../components/RegisterAdmin';

function Register() {
  return (
    <>
      {/* <h2>Register page</h2> */}
      <Routes>
        <Route path='*'>
          <Route index element={<RegisterStudent />} />
          <Route path='admin' element={<RegisterAdmin />} />
        </Route>
      </Routes>
    </>
  )
}

export default Register
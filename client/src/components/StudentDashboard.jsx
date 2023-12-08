import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HostelOptions from './hostelOptions/HostelOptions';
import GetRoom from './hostelOptions/GetRoom';
import ChangeRoom from './hostelOptions/ChangeRoom';
import LeaveHostel from './hostelOptions/LeaveHostel';

function StudentDashboard() {
  let { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-body-primary border-2 h-full w-1/2 flex flex-col justify-around align-center p-4">
      <h2 className='mb-4 font-bold text-xl'>Student Dashboard</h2>
      <div className='h-4/5'>
        <h2 className='mb-4 font-bold'>Hostel Options</h2>
        <div className='flex flex-col gap-4 justify-center items-center h-5/6 w-full'>
          <Routes>
            <Route path='/' element={<HostelOptions />} />
            <Route path='getRoom' element={<GetRoom />} />
            <Route path='changeRoom' element={<ChangeRoom />} />
            <Route path='leaveHostel' element={<LeaveHostel />} />
          </Routes>
          {
            !(pathname == "/dashboard") &&
            <button className='btn btn-outline-success' onClick={() => navigate("/dashboard")}>Back</button>
          }
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
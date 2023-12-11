import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import StudentHostelOptions from './studentHostelOptions/StudentHostelOptions';
import GetRoom from './studentHostelOptions/GetRoom';
import ChangeRoom from './studentHostelOptions/ChangeRoom';
import LeaveRoom from './studentHostelOptions/LeaveRoom';
import StudentInfoPanel from './StudentInfoPanel';

function StudentDashboard() {
  let { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <StudentInfoPanel />
      <div className="bg-body-primary border-2 h-full w-1/2 flex flex-col justify-around align-center p-4">
        <h2 className='mb-4 font-bold text-xl'>Student Dashboard</h2>
        <div className='h-4/5'>
          <h2 className='mb-4 font-bold'>Hostel Options</h2>
          <div className='flex flex-col gap-4 items-center h-5/6 w-full'>
            <Routes>
              <Route path='/' element={<StudentHostelOptions />} />
              <Route path='get-room' element={<GetRoom />} />
              <Route path='change-room' element={<ChangeRoom />} />
              <Route path='leave-room' element={<LeaveRoom />} />
            </Routes>
            {
              !(pathname == "/dashboard") &&
              <button className='btn btn-outline-success' onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentDashboard
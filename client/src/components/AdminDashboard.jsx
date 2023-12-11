import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AdminHostelOptions from './adminHostelOptions/AdminHostelOptions';
import ViewRooms from './adminHostelOptions/ViewRooms';
import ViewAllStudents from './adminHostelOptions/ViewAllStudents';
import ViewAllAllocatedRooms from './adminHostelOptions/ViewAllAllocatedRooms';
import AddRoom from './adminHostelOptions/AddRoom';
import RemoveRoom from './adminHostelOptions/RemoveRoom';
import AllocateRoom from './adminHostelOptions/AllocateRoom';
import ChangeRoom from './adminHostelOptions/ChangeRoom';
import DeallocateRoom from './adminHostelOptions/DeallocateRoom';
import AddStudent from './adminHostelOptions/AddStudent';
import RemoveStudent from './adminHostelOptions/RemoveStudent';
import AdminInfoPanel from './AdminInfoPanel';
import Room from './adminHostelOptions/Room';
import ViewStudentsInHostel from './adminHostelOptions/ViewStudentsInHostel';

function AdminDashboard() {
  let { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <AdminInfoPanel />
      <div className="bg-body-primary border-2 h-full w-1/2 flex flex-col justify-around align-center p-4">
        <h2 className='mb-4 font-bold text-xl'>Admin Dashboard</h2>
        <div className='h-4/5'>
          <h2 className='mb-4 font-bold'>Hostel Options</h2>
          <div className='flex flex-col gap-4 items-center h-5/6 w-full overflow-y-auto'>
            <Routes>
              <Route path='/' element={<AdminHostelOptions />} />
              <Route path='/hostel/room/:id' element={<Room />} />
              <Route path='/hostel/view-rooms' element={<ViewRooms />} />
              <Route path='/hostel/view-all-students' element={<ViewAllStudents />} />
              <Route path='/hostel/view-students-in-hostel' element={<ViewStudentsInHostel />} />
              <Route path='/hostel/view-all-allocated-rooms' element={<ViewAllAllocatedRooms />} />
              <Route path='/hostel/add-room' element={<AddRoom />} />
              <Route path='/hostel/remove-room' element={<RemoveRoom />} />
              <Route path='/hostel/allocate-room' element={<AllocateRoom />} />
              <Route path='/hostel/change-room' element={<ChangeRoom />} />
              <Route path='/hostel/deallocate-room' element={<DeallocateRoom />} />
              <Route path='/hostel/add-student' element={<AddStudent />} />
              <Route path='/hostel/remove-student' element={<RemoveStudent />} />
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

export default AdminDashboard
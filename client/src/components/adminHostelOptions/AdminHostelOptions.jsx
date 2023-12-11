import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function HostelOptions() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleViewRooms = () => {
    console.log("View Rooms")
    navigate("/dashboard/hostel/view-rooms")
  }

  const handleViewAllStudents = () => {
    console.log("View All Students")
    navigate("/dashboard/hostel/view-all-students")
  }

  const handleViewStudentsInHostel = () => {
    console.log("View Students in Hostel")
    navigate("/dashboard/hostel/view-students-in-hostel")
  }

  const handleAddRoom = () => {
    console.log("Add Room")
    navigate("/dashboard/hostel/add-room")
  }

  const handleRemoveRoom = () => {
    console.log("Remove Room")
    navigate("/dashboard/hostel/remove-room")
  }

  const handleAllocateRoom = () => {
    console.log("Allocate Room")
    navigate("/dashboard/hostel/allocate-room")
  }

  const handleChangeRoom = () => {
    console.log("Change Room")
    navigate("/dashboard/hostel/change-room")
  }

  const handleDeallocateRoom = () => {
    console.log("Deallocate Room")
    navigate("/dashboard/hostel/deallocate-room")
  }

  const handleAddStudent = () => {
    console.log("Add Student")
    navigate("/dashboard/hostel/add-student")
  }

  const handleRemoveStudent = () => {
    console.log("Remove Student")
    navigate("/dashboard/hostel/remove-student")
  }

  // const handleViewAllAllocatedRooms = () => {
  //   console.log("View All Allocated Rooms")
  //   navigate("/dashboard/hostel/viewAllAllocatedRooms")
  // }

  return (
    <>
      <button onClick={handleViewRooms} className="btn btn-outline-primary w-1/3">View Rooms</button>
      <button onClick={handleViewAllStudents} className="btn btn-outline-primary w-1/3">View All Students</button>
      <button onClick={handleViewStudentsInHostel} className="btn btn-outline-primary w-1/3">View Students in Hostel</button>
      <button onClick={handleAllocateRoom} className="btn btn-outline-primary w-1/3">Allocate Room to Student</button>
      {/* <button onClick={handleViewAllAllocatedRooms} className="btn btn-outline-primary w-1/3">View All Allocated Rooms</button> */}
      <button onClick={handleAddRoom} className="btn btn-outline-success w-1/3">Add Room</button>
      <button onClick={handleAddStudent} className="btn btn-outline-success w-1/3">Add Student to Hostel</button>
      <button onClick={handleChangeRoom} className="btn btn-outline-success w-1/3">Change Student Room</button>
      <button onClick={handleDeallocateRoom} className="btn btn-outline-danger w-1/3">Deallocate Room from Student</button>
      <button onClick={handleRemoveRoom} className="btn btn-outline-danger w-1/3">Remove Room</button>
      <button onClick={handleRemoveStudent} className="btn btn-outline-danger w-1/3">Remove Student from Hostel</button>
    </>
  )
}

export default HostelOptions
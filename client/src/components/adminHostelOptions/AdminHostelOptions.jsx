import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function HostelOptions() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleViewRooms = () => {
    console.log("View Rooms")
    navigate("/dashboard/hostel/viewRooms")
  }

  const handleViewAllStudents = () => {
    console.log("View All Students")
    navigate("/dashboard/hostel/viewAllStudents")
  }

  const handleViewStudentsInHostel = () => {
    console.log("View Students in Hostel")
    navigate("/dashboard/hostel/viewStudentsInHostel")
  }

  const handleAddRoom = () => {
    console.log("Add Room")
    navigate("/dashboard/hostel/addRoom")
  }

  const handleRemoveRoom = () => {
    console.log("Remove Room")
    navigate("/dashboard/hostel/removeRoom")
  }

  const handleAddStudent = () => {
    console.log("Add Student")
    navigate("/dashboard/hostel/addStudent")
  }

  const handleRemoveStudent = () => {
    console.log("Remove Student")
    navigate("/dashboard/hostel/removeStudent")
  }

  const handleViewAllAllocatedRooms = () => {
    console.log("View All Allocated Rooms")
    navigate("/dashboard/hostel/viewAllAllocatedRooms")
  }

  return (
    <>
      <button onClick={handleViewRooms} className="btn btn-outline-primary w-1/3">View Rooms</button>
      <button onClick={handleViewAllStudents} className="btn btn-outline-primary w-1/3">View All Students</button>
      <button onClick={handleViewStudentsInHostel} className="btn btn-outline-primary w-1/3">View Students in Hostel</button>
      <button onClick={handleViewAllAllocatedRooms} className="btn btn-outline-primary w-1/3">View All Allocated Rooms</button>
      <button onClick={handleAddRoom} className="btn btn-outline-success w-1/3">Add Room</button>
      <button onClick={handleAddStudent} className="btn btn-outline-success w-1/3">Add Student to Hostel</button>
      <button onClick={handleRemoveRoom} className="btn btn-outline-danger w-1/3">Remove Room</button>
      <button onClick={handleRemoveStudent} className="btn btn-outline-danger w-1/3">Remove Student from Hostel</button>
    </>
  )
}

export default HostelOptions
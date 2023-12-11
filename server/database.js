import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
}).promise()


// Function to check if a student exists
export async function checkStudentExists(studentId) {
  try {
    const [student] = await pool.query('SELECT * FROM students WHERE student_id = ?', [studentId]);
    return student.length > 0;
  } catch (error) {
    console.error('Error in checkStudentExists:', error.message);
    return false;
  }
}

// Function to check if a room exists
export async function checkRoomExists(roomId) {
  try {
    const [room] = await pool.query('SELECT * FROM hostel_rooms WHERE room_id = ?', [roomId]);
    return room.length > 0;
  } catch (error) {
    console.error('Error in checkRoomExists:', error.message);
    return false;
  }
}

// Function to check if a student is registered in the hostel
export async function checkStudentRegisteredInHostel(studentId) {
  try {
    const [student] = await pool.query('SELECT * FROM hostel_students WHERE student_id = ?', [studentId]);
    return student.length > 0;
  } catch (error) {
    console.error('Error in checkStudentRegistered:', error.message);
    return false;
  }
}

// Function to check if an admin is registered in the hostel
export async function checkAdminRegisteredInHostel(adminId) {
  try {
    const [admin] = await pool.query('SELECT * FROM hostel_admins WHERE hostel_admin_id = ?', [adminId]);
    return admin.length > 0;
  } catch (error) {
    console.error('Error in checkAdminRegistered:', error.message);
    return false;
  }

}

// Function to get admin details
export async function getAdminDetails(adminId) {
  try {
    // Check if the admin is registered in the hostel
    if (!(await checkAdminRegisteredInHostel(adminId))) {
      return {
        success: false,
        message: 'Admin is not registered in the hostel.'
      };
    }
    
    const [adminDetails] = await pool.query('SELECT * FROM hostel_admins WHERE hostel_admin_id = ?', [adminId]);

    return {
      success: true,
      data: adminDetails[0]
    };
  } catch (error) {
    console.error('Error in getAdminDetails:', error.message);
    return {
      success: false,
      message: 'Something went wrong.'
    };
  }
}

// Function to get all admins details
export async function getAllAdminsDetails() {
  try {
    // Get all admins
    const [admins] = await pool.query('SELECT * FROM hostel_admins');

    // Get details for each admin
    const adminsDetails = await Promise.all(admins.map(async (admin) => {
      return (await getAdminDetails(admin.hostel_admin_id)).data;
    }));

    return {
      success: true,
      data: adminsDetails
    };
  } catch (error) {
    console.error('Error in getAllAdminsDetails:', error.message);
    return {
      success: false,
      message: 'Something went wrong.'
    };
  }
}

// Function to register admin in hostel
export async function registerAdminInHostel(adminId, name, email, hashedPassword) {
  if (!adminId || !name || !email || !hashedPassword)
    return {
      success: false, message: 'Invalid parameters.'
    };
  try {
    // Check if the admin is already registered in the hostel
    if (await checkAdminRegisteredInHostel(adminId)) {
      return {
        success: false,
        message: 'Admin is already registered in the hostel.'
      };
    }

    console.log("registering now")

    // Register the admin in the hostel
    await pool.query('INSERT INTO hostel_admins (hostel_admin_id, name, email, hashed_password) VALUES (?, ?, ?, ?)', [adminId, name, email, hashedPassword]);

    return {
      success: true,
      data: (await getAdminDetails(adminId)).data
    };
  } catch (error) {
    console.error('Error in registerAdminInHostel:', error.message);
    return {
      success: false,
      message: 'An error occurred while registering the admin in the hostel.'
    };
  }
}

// Function to update admin details
export async function updateAdminDetails(adminId, name, email) {
  if (!adminId || !name || !email)
    return {
      success: false, message: 'Invalid parameters.'
    };
  try {
    // Check if the admin exists
    if (!(await checkAdminRegisteredInHostel(adminId))) {
      return {
        success: false,
        message: 'Admin does not exist.'
      };
    }

    // update the admin details
    await pool.query('UPDATE hostel_admins SET name = ?, email = ? WHERE hostel_admin_id = ?', [name, email, adminId]);

    return {
      success: true,
      data: (await getAdminDetails(adminId)).data
    };
  } catch (error) {
    console.error('Error in updateAdminDetails:', error.message);
    return {
      success: false,
      message: 'Something went wrong.'
    };
  }
}

// Function to remove admin from hostel
export async function removeAdminFromHostel(adminId) {
  try {
    // Check if the admin exists
    if (!(await checkAdminRegisteredInHostel(adminId))) {
      return {
        success: false,
        message: 'Admin does not exist.'
      };
    }

    // Remove the admin from the hostel
    await pool.query('DELETE FROM hostel_admins WHERE hostel_admin_id = ?', [adminId]);

    return {
      success: true,
      message: 'Admin removed successfully.'
    };
  } catch (error) {
    console.error('Error in removeAdminFromHostel:', error.message);
    return {
      success: false,
      message: 'An error occurred while removing the admin from the hostel.'
    };
  }
}

// Function to get student hashed password
export async function getHostelStudentHashedPassword(studentId) {
  try {
    // Check if the student exists
    if (!(await checkStudentExists(studentId))) {
      return {
        success: false,
        message: 'Student does not exist.'
      };
    }

    // Check if the student is registered in the hostel
    if (!(await checkStudentRegisteredInHostel(studentId))) {
      return {
        success: false,
        message: 'Student is not registered in the hostel.'
      };
    }

    // Get the student's hashed password
    const [student] = await pool.query('SELECT hashed_password FROM hostel_students WHERE student_id = ?', [studentId]);

    return {
      success: true,
      data: student[0].hashed_password
    };
  } catch (error) {
    console.error('Error in getStudentHashedPassword:', error.message);
    return {
      success: false,
      message: 'Something went wrong.'
    };
  }
}

// Function to get student details
export async function getStudentDetails(studentId) {
  try {
    // Check if the student exists
    if (!(await checkStudentExists(studentId))) {
      return {
        success: false,
        message: 'Student does not exist.'
      };
    }

    // Get the student details
    const [student] = await pool.query('SELECT * FROM students WHERE student_id = ?', [studentId]);

    // Get the student's room
    const roomDetails = await getStudentRoom(studentId);

    return {
      success: true,
      data: {
        ...student[0],
        registeredInHostel: await checkStudentRegisteredInHostel(studentId),
        roomAllocated: roomDetails.success,
        roomDetails: roomDetails.data
      }
    };
  } catch (error) {
    console.error('Error in getStudentDetails:', error.message);
    return {
      success: false,
      message: 'Something went wrong.'
    };
  }
}

// Function to get all students details
export async function getAllStudentsDetails() {
  try {
    // Get all students
    const [students] = await pool.query('SELECT * FROM students');

    // Get details for each student
    const studentsDetails = await Promise.all(students.map(async (student) => {
      return (await getStudentDetails(student.student_id)).data;
    }));

    return {
      success: true,
      data: studentsDetails
    };
  } catch (error) {
    console.error('Error in getAllStudentsDetails:', error.message);
    return {
      success: false,
      message: 'Something went wrong.'
    };
  }
}

// Function to update student details
export async function updateStudentDetails(studentId, name, email, phone, state, batch, course) {
  if (!studentId || !name || !email || !phone || !state || !batch || !course)
    return {
      success: false, message: 'Invalid parameters.'
    };
  try {
    // Check if the student exists
    if (!(await checkStudentExists(studentId))) {
      return {
        success: false,
        message: 'Student does not exist.'
      };
    }

    // update the student details
    await pool.query('UPDATE students SET name = ?, email = ?, phone = ?, state = ?, batch = ?, course = ? WHERE student_id = ?', [name, email, phone, state, batch, course, studentId]);

    return {
      success: true,
      data: (await getStudentDetails(studentId)).data
    };
  } catch (error) {
    console.error('Error in updateStudentDetails:', error.message);
    return {
      success: false,
      message: 'Something went wrong.'
    };
  }
}

// Function to register a student in the hostel
export async function registerStudentInHostel(studentId, hashedPassword) {
  try {
    // Check if the student exists
    if (!(await checkStudentExists(studentId))) {
      return {
        success: false,
        message: 'Student does not exist.'
      };
    }

    // Check if the student is already registered in the hostel
    if (await checkStudentRegisteredInHostel(studentId)) {
      return {
        success: false,
        message: 'Student is already registered in the hostel.'
      };
    }

    // Register the student in the hostel
    await pool.query('INSERT INTO hostel_students (student_id, hashed_password) VALUES (?, ?)', [studentId, hashedPassword]);

    return {
      success: true,
      data: (await getStudentDetails(studentId)).data
    };
  } catch (error) {
    console.error('Error in registerStudentInHostel:', error.message);
    return {
      success: false,
      message: 'An error occurred while registering the student in the hostel.'
    };
  }
}

// Function to remove a student from the hostel
export async function removeStudentFromHostel(studentId) {
  try {
    // Check if the student exists
    if (!(await checkStudentExists(studentId))) {
      return {
        success: false,
        message: 'Student does not exist.'
      };
    }

    // Check if the student is registered in the hostel
    if (!(await checkStudentRegisteredInHostel(studentId))) {
      return {
        success: false,
        message: 'Student is not registered in the hostel.'
      };
    }

    // Check if the student is allocated to a room
    const [studentRoom] = await pool.query('SELECT room_id FROM hostel_allocation WHERE student_id = ? AND leave_date IS NULL', [studentId]);

    if (studentRoom.length > 0) {
      return {
        success: false,
        message: 'Student is allocated to a room. Please leave the room first.'
      };
    }

    // Remove the student from hostel_allocation table
    await pool.query('DELETE FROM hostel_allocation WHERE student_id = ?', [studentId])

    // Remove the student from the hostel
    await pool.query('DELETE FROM hostel_students WHERE student_id = ?', [studentId]);

    return {
      success: true,
      data: (await getStudentDetails(studentId)).data
    };
  } catch (error) {
    console.error('Error in removeStudentFromHostel:', error.message);
    return {
      success: false,
      message: 'An error occurred while removing the student from the hostel.'
    };
  }

}

// Function to allocate a room to a student
export async function allocateRoomToStudent(studentId, roomId) {
  try {
    // Check if the student exists
    if (!(await checkStudentExists(studentId))) {
      return {
        success: false,
        message: 'Student does not exist.'
      };
    }

    // Check if the student is already registered in the hostel
    if (!(await checkStudentRegisteredInHostel(studentId))) {
      return {
        success: false,
        message: 'Student is not registered in the hostel. Please register first.'
      };
    }

    // Check if the student is already allocated to a room
    const [existingAllocation] = await pool.query(`
      SELECT * FROM hostel_allocation
      WHERE student_id = ? AND leave_date IS NULL
      `, [studentId]
    );

    if (existingAllocation.length > 0) {
      return {
        success: false,
        message: 'Student is already allocated to a room.'
      };
    }

    // Check if the room exists
    if (!(await checkRoomExists(roomId))) {
      return {
        success: false,
        message: 'Room does not exist.'
      };
    }

    // Check if there is an available bed in the specified room
    const [occupiedBeds] = await pool.query(`
      SELECT COUNT(*) AS occupied_beds
      FROM hostel_allocation
      WHERE room_id = ? AND leave_date IS NULL
      `, [roomId]
    );
    const [roomDetails] = await pool.query(`SELECT * FROM hostel_rooms WHERE room_id = ?`, [roomId]);

    if (occupiedBeds[0].occupied_beds >= roomDetails[0].beds) {
      return { success: false, message: 'No available beds in the specified room.' };
    }

    // Allocate the student to the specified room
    await pool.query('INSERT INTO hostel_allocation (student_id, room_id) VALUES (?, ?)', [studentId, roomId]);

    return {
      success: true,
      data: (await getStudentDetails(studentId)).data
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong.'
    };
  }
};

// Function to leave a room by a student
export async function leaveRoom(studentId) {
  try {
    // Check if the student exists
    if (!(await checkStudentExists(studentId))) {
      return {
        success: false,
        message: 'Student does not exist.'
      };
    }

    // Check if the student is registered in the hostel
    if (!(await checkStudentRegisteredInHostel(studentId))) {
      return {
        success: false,
        message: 'Student is not registered in the hostel.'
      };
    }

    // Get the student's room
    const [studentRoom] = await pool.query('SELECT room_id FROM hostel_allocation WHERE student_id = ? AND leave_date IS NULL', [studentId]);

    // Check if the student is not allocated to any room
    if (studentRoom.length === 0) {
      return {
        success: false,
        message: 'Student is not allocated to any room.'
      };
    }

    // Remove the student from the room
    await pool.query('UPDATE hostel_allocation SET leave_date = CURRENT_TIMESTAMP WHERE student_id = ? AND leave_date IS NULL', [studentId]);

    return {
      success: true,
      data: (await getStudentDetails(studentId)).data
    };
  } catch (error) {
    console.error('Error in leaveRoom:', error.message);
    return {
      success: false,
      message: 'Something went wrong.'
    };
  }
}

// Function to change a student's room
export async function changeStudentRoom(studentId, newRoomId) {
  if (!studentId || !newRoomId)
    return {
      success: false, message: 'Invalid parameters.'
    };
  try {
    // Check if the student exists
    if (!(await checkStudentExists(studentId))) {
      return {
        success: false,
        message: 'Student does not exist.'
      };
    }

    // Check if the student is registered in the hostel
    if (!(await checkStudentRegisteredInHostel(studentId))) {
      return {
        success: false,
        message: 'Student is not registered in the hostel.'
      };
    }

    // Get the student's room
    const { data: studentRoom } = await getStudentRoom(studentId);

    // Check if the student is not allocated to any room
    if (!studentRoom) {
      return {
        success: false,
        message: 'Student is not allocated to any room.'
      };
    }

    // Check if student is already allocated to the specified room
    if (studentRoom.room_id === newRoomId) {
      return {
        success: false,
        message: 'Student is already allocated to the specified room.'
      };
    }

    // Remove the student from the current room
    const leaveRoomResult = await leaveRoom(studentId);

    if (!leaveRoomResult.success) {
      return leaveRoomResult;
    }

    // Allocate the student to the new room
    const allocateRoomResult = await allocateRoomToStudent(studentId, newRoomId);

    if (!allocateRoomResult.success) {
      return allocateRoomResult;
    }

    return {
      success: true,
      data: (await getStudentDetails(studentId)).data
    };
  } catch (error) {
    console.error('Error in changeStudentRoom:', error.message);
    return {
      success: false,
      message: 'Something went wrong.'
    };
  }
}

// Function to get complete details for one room
export async function getRoomDetails(roomId, showStudentPrivateDetails = false) {
  try {
    // Check if the room exists
    if (!(await checkRoomExists(roomId))) {
      return {
        success: false,
        message: 'Room does not exist.'
      };
    }

    // Get room details
    const [roomDetails] = await pool.query('SELECT * FROM hostel_rooms WHERE room_id = ?', [roomId]);

    // Get count of allocated beds in the room
    const [allocatedBeds] = await pool.query('SELECT COUNT(*) AS allocated_beds FROM hostel_allocation WHERE room_id = ? AND leave_date IS NULL', [roomId]);

    // Calculate available beds
    const availableBeds = roomDetails[0].beds - allocatedBeds[0].allocated_beds;

    // Get students in the room
    const [studentsInRoom] = await pool.query(`
      SELECT ${showStudentPrivateDetails ? 's.*' : 's.state, s.batch, s.course'} FROM students s
      JOIN hostel_allocation ha
      ON s.student_id = ha.student_id
      WHERE ha.room_id = ? AND ha.leave_date IS NULL
      `, [roomId]
    );

    return {
      success: true,
      data: {
        ...roomDetails[0],
        availableBeds,
        studentsInRoom
      }
    };
  } catch (error) {
    console.error('Error in getRoomDetails:', error.message);
    return {
      success: false,
      message: 'Something went wrong.'
    };
  }
}

// Function to get the room of a student
export async function getStudentRoom(studentId) {
  try {
    // Check if the student exists
    if (!(await checkStudentExists(studentId))) {
      return {
        success: false,
        message: 'Student does not exist.'
      };
    }

    // Check if the student is registered in the hostel
    if (!(await checkStudentRegisteredInHostel(studentId))) {
      return {
        success: false,
        message: 'Student is not registered in the hostel.'
      };
    }

    // Get the student's room
    const [studentRoom] = await pool.query('SELECT room_id FROM hostel_allocation WHERE student_id = ? AND leave_date IS NULL', [studentId]);

    // Check if the student is not allocated to any room
    if (studentRoom.length === 0) {
      return {
        success: false,
        message: 'Student is not allocated to any room.'
      };
    }

    // Get the room details
    const { data: roomDetails } = await getRoomDetails(studentRoom[0].room_id, true);

    // return roomDetails;
    return {
      success: true,
      data: roomDetails
    };
  } catch (error) {
    console.error('Error in getStudentRoom:', error.message);
    return {
      success: false,
      message: 'Something went wrong.'
    };
  }
}

// Function to add a room
export async function addRoom(roomId, floor, beds, ac) {
  if (!roomId || !floor || !beds || ac == undefined || beds < 1)
    return {
      success: false, message: 'Invalid parameters.'
    };
  try {
    // Check if the room already exists
    if (await checkRoomExists(roomId)) {
      return {
        success: false,
        message: 'Room already exists.'
      };
    }

    // Add the room
    await pool.query('INSERT INTO hostel_rooms (room_id, floor, beds, ac) VALUES (?, ?, ?, ?)', [roomId, floor, beds, ac]);

    return {
      success: true,
      data: (await getRoomDetails(roomId)).data
    };
  } catch (error) {
    console.error('Error in addRoom:', error.message);
    return {
      success: false,
      message: 'Something went wrong.'
    };
  }
}

// Function to remove a room
export async function removeRoom(roomId) {
  try {
    // Check if the room exists
    if (!(await checkRoomExists(roomId))) {
      return {
        success: false,
        message: 'Room does not exist.'
      };
    }

    // Remove the room
    await pool.query('DELETE FROM hostel_rooms WHERE room_id = ?', [roomId]);

    return {
      success: true,
      message: 'Room removed successfully.'
    };
  } catch (error) {
    console.error('Error in removeRoom:', error.message);
    return {
      success: false,
      message: 'Something went wrong.'
    };
  }
}

// Function to update room details
export async function updateRoomDetails(roomId, floor, beds, ac) {
  if (!roomId || !floor || !beds || ac == undefined || beds < 1)
    return {
      success: false, message: 'Invalid parameters.'
    };

  try {
    // Check if the room exists
    if (!(await checkRoomExists(roomId))) {
      return {
        success: false,
        message: 'Room does not exist.'
      };
    }

    // Checking if the room is occupied
    const [occupiedBeds] = await pool.query(`
      SELECT COUNT(*) AS occupied_beds
      FROM hostel_allocation
      WHERE room_id = ? AND leave_date IS NULL
      `, [roomId]
    );

    if (occupiedBeds[0].occupied_beds > 0) {
      return {
        success: false,
        message: 'Room cannot be updated as it is occupied.'
      };
    }

    // Update the room details
    await pool.query('UPDATE hostel_rooms SET floor = ?, beds = ?, ac = ? WHERE room_id = ?', [floor, beds, ac, roomId]);

    return {
      success: true,
      data: (await getRoomDetails(roomId)).data
    };
  } catch (error) {
    console.error('Error in updateRoomDetails:', error.message);
    return {
      success: false,
      message: 'Something went wrong.'
    };
  }
}

// Function to get details of all students registered in the hostel
export async function getAllStudentsInHostel() {
  try {
    // Get all students
    const [students] = await pool.query(`SELECT * FROM hostel_students`);

    // Get details for each student
    const studentsDetails = await Promise.all(students.map(async (student) => {
      return (await getStudentDetails(student.student_id)).data;
    }));

    return {
      success: true,
      data: studentsDetails
    };
  } catch (error) {
    console.error('Error in getAllStudentsInHostel:', error.message);
    return {
      success: false,
      message: 'Something went wrong.'
    };
  }
}

// Function to get all rooms with filters
export async function getAllRoomsDetails(filters = {}, showStudentPrivateDetails = false) {
  const { floor, beds, ac, bedsAvailable } = filters;
  try {
    let query = 'SELECT * FROM hostel_rooms WHERE 1=1';
    let args = [];

    if (floor) {
      query += ' AND floor = ?';
      args.push(floor);
    }

    if (beds) {
      query += ' AND beds = ?';
      args.push(beds);
    }

    if (ac != undefined) {
      query += ' AND ac = ?';
      args.push(ac);
    }

    const [rooms] = await pool.query(query, args);

    const roomsDetails = await Promise.all(rooms.map(async (room) => {
      return (await getRoomDetails(room.room_id, showStudentPrivateDetails)).data;
    }));

    return {
      success: true,
      data: (
        bedsAvailable
          ? roomsDetails.filter(room => room.availableBeds > 0)
          : roomsDetails
      )
    };
  } catch (error) {
    console.error('Error in getAllRoomsDetails:', error.message);
    return {
      success: false,
      message: 'Something went wrong.'
    };
  }
}


// console.log(await checkStudentExists(2211981191));
// console.log(await checkRoomExists(501));
// console.log(await checkStudentRegisteredInHostel(2111981102));
// console.log(await registerStudentInHostel(2111981102));
// console.log(await allocateRoomToStudent(2111981101, 101));
// console.log(await leaveRoom(2111981101));
// console.log(await getStudentDetails(2111981101));
// console.log(await getStudentRoom(2111981101));
// console.log(await changeStudentRoom(2111981101, 102));
// console.log(await getAllStudentsDetails());
// console.log(await updateStudentDetails(2111981101, "Aayush", "aayush1101@gmail.com", 9870123456, "Haryana", 2021, "CSE"))
// console.log(await removeStudentFromHostel(2111981102));
// console.log((await getRoomDetails(102, false)).data);
// console.log(await addRoom(501, 5, 5, false));
// console.log(await removeRoom(502));
// console.log(await updateRoomDetails(501, 5, 5, false));
// console.log(await getAllStudentsInHostel())
// console.log((await getAllRoomsDetails({ floor: 1, beds: 1, bedsAvailable: true }, true)).data.length);
// console.log(await registerAdminInHostel(22, "Gujrot", "gujrot@gmail.com", "34567890"));
// console.log(await getAdminDetails(11));



// apis not needed
// console.log(await checkStudentExists(2211981191));
// console.log(await checkRoomExists(501));
// console.log(await checkStudentRegisteredInHostel(2111981102));
// console.log(await getHostelStudentHashedPassword(2111981101));
// console.log(await checkAdminRegisteredInHostel(11));

// completed apis
// console.log((await getRoomDetails(102, false)).data);
// console.log(await addRoom(501, 5, 5, false));
// console.log(await removeRoom(502));
// console.log(await updateRoomDetails(501, 5, 5, false));
// console.log(await getAllStudentsInHostel())
// console.log((await getAllRoomsDetails({ floor: 1, beds: 1, bedsAvailable: true }, true)).data.length);
// console.log(await registerStudentInHostel(2111981102));
// console.log(await removeStudentFromHostel(2111981102));
// console.log(await getStudentDetails(2111981101));
// console.log(await getAllStudentsDetails());
// console.log(await updateStudentDetails(2111981101, "Aayush", "aayush1101@gmail.com", 9870123456, "Haryana", 2021, "CSE"))
// console.log(await allocateRoomToStudent(2111981101, 101));
// console.log(await getStudentRoom(2111981101));
// console.log(await changeStudentRoom(2111981101, 102));
// console.log(await leaveRoom(2111981101));
// console.log(await registerAdminInHostel(22, "Gujrot", "gujrot@gmail.com", "34567890"));
// console.log(await getAdminDetails(11));
// console.log(await getAllAdminsDetails());
// console.log(await updateAdminDetails(11, "Gujrot", "gujrot@gmail.com"))
// console.log(await removeAdminFromHostel(22));
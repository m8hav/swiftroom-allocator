import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import {
  addRoom,
  allocateRoomToStudent,
  changeStudentRoom,
  getAllRoomsDetails,
  getAllStudentsDetails,
  getAllStudentsInHostel,
  getRoomDetails,
  getStudentDetails,
  getStudentRoom,
  leaveRoom,
  registerStudentInHostel,
  removeRoom,
  removeStudentFromHostel,
  updateRoomDetails,
  updateStudentDetails
} from './database.js';

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));
app.use(cors());
app.use(express.json());



// Register student in hostel
app.post('/api/hostel/students', async (req, res) => {
  try {
    const result = await registerStudentInHostel(req.body.studentId);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).send(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something broke!");
  }
});

// Login student
app.post('/api/hostel/students/login', async (req, res) => {
  try {
    const result = await getStudentDetails(req.body.studentId);
    if (result.success) {
      const student = result.data;
      const passwordMatch = await bcrypt.compare(req.body.password, student.password);
      if (passwordMatch) {
        res.status(200).json(student);
      } else {
        res.status(400).send("Incorrect password");
      }
    } else {
      res.status(400).send(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something broke!");
  }

});

// Get all students in hostel
app.get('/api/hostel/students', async (req, res) => {
  try {
    const result = await getAllStudentsInHostel();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).send(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something broke!");
  }
});

// Remove student from hostel
app.delete('/api/hostel/students/:id', async (req, res) => {
  try {
    const result = await removeStudentFromHostel(req.params.id);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).send(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something broke!");
  }
});

// Allocate room to student
app.post('/api/hostel/students/:id/room', async (req, res) => {
  try {
    const result = await allocateRoomToStudent(req.params.id, req.body.roomId);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).send(result.message)
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something broke!");
  }
});

// Get student room details
app.get('/api/hostel/students/:id/room', async (req, res) => {
  try {
    const result = await getStudentRoom(req.params.id);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).send(result.message)
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something broke!");
  }
});

// Change student room
app.put('/api/hostel/students/:id/room', async (req, res) => {
  try {
    const result = await changeStudentRoom(req.params.id, req.body.roomId);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).send(result.message)
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something broke!");
  }
});

// Deallocate room from student
app.delete('/api/hostel/students/:id/room', async (req, res) => {
  try {
    const result = await leaveRoom(req.params.id);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).send(result.message)
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something broke!");
  }
});


// Get all rooms, with optional filters
app.get('/api/hostel/rooms', async (req, res) => {
  try {
    const filters = req.query;
    const result = await getAllRoomsDetails(filters, req.query.showStudentPrivateDetails);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).send(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something broke!");
  }
});

// Get a specific room by id
app.get('/api/hostel/rooms/:id', async (req, res) => {
  try {
    const result = await getRoomDetails(req.params.id, req.query.showStudentPrivateDetails);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).send(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something broke!");
  }
});

// Create a room
app.post('/api/hostel/rooms', async (req, res) => {
  try {
    const result = await addRoom(req.body.roomId, req.body.floor, req.body.beds, req.body.ac);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).send(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something broke!");
  }
});

// Update a room
app.put('/api/hostel/rooms/:id', async (req, res) => {
  try {
    const result = await updateRoomDetails(req.params.id, req.body.floor, req.body.beds, req.body.ac);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).send(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something broke!");
  }
});

// Remove a room
app.delete('/api/hostel/rooms/:id', async (req, res) => {
  try {
    const result = await removeRoom(req.params.id);
    if (result.success) {
      res.status(200).json(result.message);
    } else {
      res.status(400).send(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something broke!");
  }
});

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const result = await getAllStudentsDetails();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).send(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something broke!");
  }
});

// Get a specific student by id
app.get('/api/students/:id', async (req, res) => {
  try {
    const result = await getStudentDetails(req.params.id);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).send(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something broke!");
  }
});

// Update student details
app.put('/api/students/:id', async (req, res) => {
  try {
    const result = await updateStudentDetails(req.params.id, req.body.name, req.body.email, req.body.phone, req.body.state, req.body.batch, req.body.course);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).send(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something broke!");
  }
});


// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Swiftroom Allocator!')
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT)
})
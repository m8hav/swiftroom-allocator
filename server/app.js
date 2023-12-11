import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
  addRoom,
  allocateRoomToStudent,
  changeStudentRoom,
  getAdminDetails,
  getAllAdminsDetails,
  getAllRoomsDetails,
  getAllStudentsDetails,
  getAllStudentsInHostel,
  getRoomDetails,
  getStudentDetails,
  getHostelStudentHashedPassword,
  getStudentRoom,
  leaveRoom,
  registerAdminInHostel,
  registerStudentInHostel,
  removeAdminFromHostel,
  removeRoom,
  removeStudentFromHostel,
  updateAdminDetails,
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





// Protected route that requires JWT authentication
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully.', user: req.user });
});
app.get('/api/protected/:id', authenticateToken, (req, res) => {
  if (req.user.type !== "admin" && req.user.id != req.params.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  res.json({ message: 'Protected route accessed successfully.', user: req.user });
});

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
}

// Register admin in hostel
app.post('/api/hostel/admins', async (req, res) => {
  const { id, name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await registerAdminInHostel(id, name, email, hashedPassword);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result);
  }
});

// Login admin in hostel
app.post('/api/hostel/admins/login', async (req, res) => {
  const result = await getAdminDetails(req.body.id);
  if (result.success) {
    const hashed_password = result.data.hashed_password;
    // console.log(hashed_password)
    const passwordMatch = await bcrypt.compare(req.body.password, hashed_password);
    if (passwordMatch) {
      // Generate a JWT
      const token = jwt.sign({ id: req.body.id, type: "admin" }, process.env.ACCESS_TOKEN_SECRET);
      res.status(200).json({ token });
    } else {
      res.status(400).send({ message: "Incorrect password" });
    }
  } else {
    res.status(400).send(result);
  }
});

// Get admin details
app.get('/api/hostel/admins/:id', authenticateToken, async (req, res) => {
  const result = await getAdminDetails(req.params.id);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result);
  }
});

// Get all admins in hostel
app.get('/api/hostel/admins', authenticateToken, async (req, res) => {
  const result = await getAllAdminsDetails();
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result);
  }
});

// Update admin details
app.put('/api/hostel/admins/:id', authenticateToken, async (req, res) => {
  if (req.user.id != req.params.id || req.user.type !== "admin") {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const result = await updateAdminDetails(req.params.id, req.body.name, req.body.email);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result)
  }
});

// Remove admin from hostel
app.delete('/api/hostel/admins/:id', async (req, res) => {
  if (req.user.id != req.params.id || req.user.type !== "admin") {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const result = await removeAdminFromHostel(req.params.id);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result)
  }
});

// Register student in hostel
app.post('/api/hostel/students', async (req, res) => {
  const { id, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await registerStudentInHostel(id, hashedPassword);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result);
  }
});

// Login student in hostel and get JWT
app.post('/api/hostel/students/login', async (req, res) => {
  const result = await getHostelStudentHashedPassword(req.body.id);
  if (result.success) {
    const hashed_password = result.data;
    const passwordMatch = await bcrypt.compare(req.body.password, hashed_password);
    if (passwordMatch) {
      // Generate a JWT
      const token = jwt.sign({ id: req.body.id, type: "student" }, process.env.ACCESS_TOKEN_SECRET);
      res.status(200).json({ token });
    } else {
      res.status(400).send({ message: "Incorrect password" });
    }
  } else {
    res.status(400).send(result);
  }
});

// Get all students in hostel
app.get('/api/hostel/students', authenticateToken, async (req, res) => {
  if (req.user.type !== "admin") {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const result = await getAllStudentsInHostel();
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result);
  }
});

// Get a specific student by id in hostel
app.get('/api/hostel/students/:id', authenticateToken, async (req, res) => {
  if (req.user.type !== "admin" && req.user.id != req.params.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const result = await getStudentDetails(req.params.id);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result);
  }
});

// Remove student from hostel
app.delete('/api/hostel/students/:id', authenticateToken, async (req, res) => {
  if (req.user.type !== "admin" && req.user.id != req.params.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const result = await removeStudentFromHostel(req.params.id);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result);
  }
});

// Allocate room to student
app.post('/api/hostel/students/:id/room', authenticateToken, async (req, res) => {
  if (req.user.type !== "admin" && req.user.id != req.params.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const result = await allocateRoomToStudent(req.params.id, req.body.roomId);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result)
  }
});

// Get student room details
app.get('/api/hostel/students/:id/room', authenticateToken, async (req, res) => {
  if (req.user.type !== "admin" && req.user.id != req.params.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const result = await getStudentRoom(req.params.id);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result)
  }
});

// Change student room
app.put('/api/hostel/students/:id/room', authenticateToken, async (req, res) => {
  if (req.user.type !== "admin" && req.user.id != req.params.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const result = await changeStudentRoom(req.params.id, req.body.roomId);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result)
  }
});

// Deallocate room from student
app.delete('/api/hostel/students/:id/room', authenticateToken, async (req, res) => {
  if (req.user.type !== "admin" && req.user.id != req.params.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const result = await leaveRoom(req.params.id);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result)
  }
});


// Get all rooms, with optional filters
app.get('/api/hostel/rooms', authenticateToken, async (req, res) => {
  const filters = req.query;
  const result = await getAllRoomsDetails(filters, req.user.type === "admin");
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result);
  }
});

// Get a specific room by id
app.get('/api/hostel/rooms/:id', authenticateToken, async (req, res) => {
  const result = await getRoomDetails(req.params.id, req.user.type === "admin");
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result);
  }
});

// Create a room
app.post('/api/hostel/rooms', authenticateToken, async (req, res) => {
  if (req.user.type !== "admin") {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const result = await addRoom(req.body.roomId, req.body.floor, req.body.beds, req.body.ac);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result);
  }
});

// Update a room
app.put('/api/hostel/rooms/:id', authenticateToken, async (req, res) => {
  if (req.user.type !== "admin") {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const result = await updateRoomDetails(req.params.id, req.body.floor, req.body.beds, req.body.ac);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result);
  }
});

// Remove a room
app.delete('/api/hostel/rooms/:id', authenticateToken, async (req, res) => {
  if (req.user.type !== "admin") {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const result = await removeRoom(req.params.id);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result);
  }
});

// Get all students
app.get('/api/students', authenticateToken, async (req, res) => {
  if (req.user.type !== "admin") {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const result = await getAllStudentsDetails();
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result);
  }
});

// Get a specific student by id
app.get('/api/students/:id', authenticateToken, async (req, res) => {
  if (req.user.type !== "admin" && req.user.id != req.params.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const result = await getStudentDetails(req.params.id);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result);
  }
});

// Update student details
app.put('/api/students/:id', authenticateToken, async (req, res) => {
  if (req.user.type !== "admin" && req.user.id != req.params.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const result = await updateStudentDetails(req.params.id, req.body.name, req.body.email, req.body.phone, req.body.state, req.body.batch, req.body.course);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).send(result);
  }
});


// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Swiftroom Allocator!')
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({ message: "Something broke!" })
})

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT)
})
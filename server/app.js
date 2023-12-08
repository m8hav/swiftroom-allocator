const express = require('express'); 
const bodyParser = require('body-parser');



const app = express(); 
const PORT = 4500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

var mysql = require('mysql');

// create sql connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pranav@125",
    database:"swiftroom",
  });

// connect to database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  });
 

app.get('/', (req, res)=>{ 
    res.status(200); 
    res.send("Welcome to root URL of Server"); 
}); 

// for admin to get details of all students
app.get("/student", (req, res) => {
    connection.query('SELECT * FROM student where hosteller=true', (error, results, fields) => {
        if (error) {
          console.error('Error executing SELECT query: ', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json(results);
      });
});

// for admin to get details entire hostel
app.get("/hostel", (req, res) => {
    connection.query('SELECT * FROM hostel', (error, results, fields) => {
        if (error) {
          console.error('Error executing SELECT query: ', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json(results);
      });
});


// for admin to check rooms floor wise
app.get("/floor/:id", (req, res) => {
  const floorid=req.params.id;
    connection.query('SELECT * FROM hostel where floor_no='+floorid+'', (error, results, fields) => {
        if (error) {
          console.error('Error executing SELECT query: ', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json(results);
      });
});

// for admin to check total beds available in hostel
app.get("/total_beds_avail", (req, res) => {
    connection.query('SELECT sum(available_bed) from hostel', (error, results, fields) => {
        if (error) {
          console.error('Error executing SELECT query: ', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json(results);
      });
});


// for admin to check beds available floor wise
app.get("/beds_on_floor/:id", (req, res) => {
  const floorid=req.params.id;
    connection.query('SELECT sum(available_bed) from hostel where floor_no='+floorid+'', (error, results, fields) => {
        if (error) {
          console.error('Error executing SELECT query: ', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json(results);
      });
});


// for client to get desired rooms based on filter
app.get("/clientquery",(req,res)=>{
  const floor_num=3;
  const bed_num=3;
  const ac=1;
  let query;
    if((floor_num>=1 && floor_num<=4) && (bed_num>=2 && bed_num<=4) &&(ac==0 || ac==1)){
      query="select * from hostel where floor_no="+floor_num.toString()+" and num_bed="+bed_num.toString()+" and ac_room="+ac.toString()+"";
    }
    else if(floor_num>=1 && floor_num<=4 &&(ac==0 || ac==1)){
      query="select * from hostel where floor_no="+floor_num.toString()+" and ac_room="+ac.toString()+"";
    }
    else if(bed_num>=2 && bed_num<=4 &&(ac==0 || ac==1)){
      query="select * from hostel where num_bed="+bed_num.toString()+" and ac_room="+ac.toString()+"";
    }
    else if(floor_num>=1 && floor_num<=4){
      query="select * from hostel where floor_no="+floor_num.toString()+"";
    }
    else if(bed_num>=2 && bed_num<=4){
      query="select * from hostel where num_bed="+bed_num.toString()+"";
    }
    else if(ac==0 || ac==1){
      query="select * from hostel where ac_room="+ac.toString()+"";
    }
    else{
      query="select * form hostel";
    }

    connection.query(query, (error, results, fields) => {
      if (error) {
        console.error('Error executing SELECT query: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      res.json(results);
  });
});

// queries left:
// updation query which will run after a student books a room i.e. in student table hosteller status to true and room num in foreign key


  
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running,and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 
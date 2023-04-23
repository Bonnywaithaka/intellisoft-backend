const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

// create a new express app
const app = express();

// enable cross-origin resource sharing
app.use(cors());
// Enable parsing of JSON request bodies
app.use(express.json());

// create a connection to the MySQL database
const Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", 
  database: "hospital",
  connectionLimit: 20, 
});
// Connect to database
Connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

app.use(bodyParser.json());

app.post("/patients", (req, res) => {
  const { firstName, lastName, dob, gender } = req.body;

  if (!firstName || !lastName || !dob || !gender) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO patients (first_name, last_name, dob, gender)
    VALUES (?, ?, ?, ?)
  `;

  // execute the SQL query with the patient data
  Connection.query(sql, [firstName, lastName, dob, gender], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal server error" });
    }

    const patientId = result.insertId;
    const patient = { id: patientId, firstName, lastName, dob, gender };
    res.status(201).send(patient);
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to the Intellisoft patient registration system");
});

app.post('/visits', (req, res) => {
  const { id,date, height, weight, bmi } = req.body;

  const query = `INSERT INTO patient_visits (id,date, height, weight, bmi) VALUES ('${id}','${date}', ${height}, ${weight}, ${bmi})`;

  Connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } else {
      res.status(200).send('Data inserted successfully');
    }
  });
});

app.get("/patientsList",(req,res)=>{
  const query =`select * from patients`;
    Connection.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
  console.log(query);
});

app.get("/patients", (req, res) => {
  const date = req.query.date;

  const query = `
    SELECT 
      p.id, 
      p.first_name, 
      p.last_name, 
      p.dob, 
      pv.bmi 
    FROM 
      patients p 
     LEFT JOIN patient_visits pv ON p.id = pv.id 
    WHERE 
      pv.date = '${date}'
  `;

  Connection.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
   console.log(query);
});


module.exports =app;
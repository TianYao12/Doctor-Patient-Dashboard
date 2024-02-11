const PORT = process.env.PORT ?? 8000;
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const app = express();
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json()); // parses JSON in the request body

// get all users with the role 'Patient'
app.get("/patients", async (req, res) => {
  try {
    const patients = await pool.query(
      `SELECT * FROM users WHERE role = 'Patient'`
    );
    res.json(patients.rows);
    console.log(patients.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// edit a patient's prescription
app.put(`/patients/:email`, async (req, res) => {
  const { email } = req.params;
  const { requested, medication, dosage, date } = req.body;
  try {
    const editPatient = await pool.query(
      `UPDATE users SET date = $1, requested = $2, medication = $3, dosage = $4 WHERE email = $5`,
      [date, requested, medication, dosage, email]
    );
    res.json(editPatient)
  } catch (err) {
    console.error(err);
  }
});

// edit a patient's request status
app.put("/requested", async (req, res) => {
  const { userEmail, role, requested } = req.body;
  try {
    const editRequest = await pool.query(
      `UPDATE users SET requested = $1 WHERE email = $2 and role = $3`,
      [requested, userEmail, role]
    );
    res.json(editRequest);
  } catch (err) {
    console.error(err);
  }
});

// POST request to disease API
app.post("/diseases", async (req, res) => {
  const symptoms = req.body.selectedSymptoms;
  console.log("sumptoms", req.body);
  try {
    const response = await fetch(
      "https://disease-prediction-app1-aec00936fb93.herokuapp.com/predict",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      }
    );
    const data = await response.json();
    res.json(data.disease);
  } catch (err) {
    console.error(err);
  }
});

// signup
app.post("/signup", async (req, res) => {
  const { email, password, role } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const signUp = await pool.query(
      `INSERT INTO users (email, hashed_password, role) VALUES($1, $2, $3)`,
      [email, hashedPassword, role]
    );

    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    res.json({ email, token, role });
  } catch (err) {
    if (error) {
      res.json({ detail: error.detail });
    }
    console.error(err);
  }
});

// login
app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const users = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND role = $2",
      [email, role]
    );
    if (!users.rows.length) return res.json({ detail: "User does not exist!" });
    const success = await bcrypt.compare(
      password,
      users.rows[0].hashed_password
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    if (success) {
      res.json({ email: users.rows[0].email, token, role }); // why is it that when it's just users.email its differnet?
    } else {
      res.json({ detail: "Login failed" });
    }
  } catch (err) {
    console.error(err);
  }
});


// get patient info for a specific user email
app.get("/patient/:userEmail", async (req, res) => {
  const { userEmail } = req.params;
  try {
    const patient_info = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [userEmail]
    );
    res.json(patient_info.rows); // put data in JSON format to be fetched by frontend
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// create new to-do
app.post("/todos", async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  const id = uuidv4();
  try {
    const newToDo = await pool.query(
      `INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
      [id, user_email, title, progress, date]
    );
    res.json(newToDo);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// edit a to-do
app.put(`/todos/:id`, async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;
  try {
    const editToDo = await pool.query(
      `UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id=$5`,
      [user_email, title, progress, date, id]
    );
    res.json(editToDo);
  } catch (err) {
    console.error(err);
  }
});

// delete a to-do
app.delete(`/todos/:id`, async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;
  try {
    const deleteToDo = await pool.query(`DELETE FROM todos WHERE id = $1`, [
      id,
    ]);
    res.json(deleteToDo);
  } catch (err) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));



 
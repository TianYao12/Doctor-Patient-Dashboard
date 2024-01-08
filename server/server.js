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

// get all todos for a specific user email
app.get("/todos/:userEmail", async (req, res) => {
  const { userEmail } = req.params;
  try {
    // query  database to get all todos for specified user email
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    );
    res.json(todos.rows); // put todos in JSON format to be fetched by frontend
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

// signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const signUp = await pool.query(
      `INSERT INTO users (email, hashed_password) VALUES($1, $2)`,
      [email, hashedPassword]
    );

    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    res.json({ email, token });
  } catch (err) {
    if (err) {
      res.json({ detail: error.detail });
    }
    console.error(err);
  }
});

// login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (!users.rows.length) return res.json({ detail: "User does not exist!" });
    const success = await bcrypt.compare(
      password,
      users.rows[0].hashed_password
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    if (success) {
      res.json({ email: users.rows[0].email, token }); // why is it that when it's just users.email its differnet?
    } else {
      res.json({ detail: "Login failed" });
    }
  } catch (err) {
    console.error(err);
  }
});

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
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));

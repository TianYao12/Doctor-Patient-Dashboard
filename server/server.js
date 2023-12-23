const PORT = process.env.PORT ?? 8000;
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const app = express();
const pool = require("./db");
app.use(cors());
app.use(express.json()); // parses JSON in the request body

// route to get all todos for a specific user by their email
app.get("/todos/:userEmail", async (req, res) => {
  const { userEmail } = req.params; // extract the user's email from the request parameters
  try {
    // query the database to get all todos for the specified user email
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    );

    // Put todos in JSON format to be fetched by frontend
    res.json(todos.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// create new to-do item
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

const express = require("express");
const cors = require("cors");
const app = express();

const pool = require("./db");

//Middlewares
app.use(cors());
app.use(express.json());

//Routes

// create a todo
app.post("/todo/create", async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: "description is required" });
    }
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    return res.status(201).json(newTodo.rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Something went wrong: ${error.message}` });
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo ORDER BY description");
    return res.status(200).json(todos.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Something went wrong: ${error.message}` });
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    if (todo.rowCount === 0) {
      return res.status(404).json({ error: "Todo is not found" });
    }
    return res.status(200).json(todo.rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Something went wrong: ${error.message}` });
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updated_at = new Date();
    if (!description) {
      return res.status(400).json({ error: "description is required" });
    }
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1, updated_at = $2 WHERE todo_id = $3",
      [description, updated_at, id]
    );
    if (updateTodo.rowCount === 1) {
      return res.status(200).json({ message: "todo was updated successfully" });
    }
    return res.status(404).json({ error: "Invalid todo_id" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Something went wrong: ${error.message}` });
  }
});

//update a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    if (deleteTodo.rowCount === 1) {
      return res.status(200).json({ message: "todo was deleted successfully" });
    }
    return res.status(404).json({ error: "Invalid todo_id" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Something went wrong: ${error.message}` });
  }
});

//mark todo as complete or incomplete
app.patch("/markTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { todo_status } = req.body;
    let completed_at = new Date();
    const updated_at = new Date();
    if (todo_status === "incomplete") {
      completed_at = null;
    }
    const updateTodo = await pool.query(
      "UPDATE todo SET todo_status = $1, completed_at = $2, updated_at = $3 WHERE todo_id = $4",
      [todo_status, completed_at, updated_at, id]
    );
    if (updateTodo.rowCount === 1) {
      return res.status(200).json({ message: "todo is updated" });
    }
    return res.status(404).json({ error: "Invalid todo_id" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Something went wrong: ${error.message}` });
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

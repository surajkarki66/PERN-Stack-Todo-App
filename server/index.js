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
      return res
        .status(400)
        .json({ data: { message: "description is required" } });
    }
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    return res.status(201).json({ data: newTodo.rows[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ data: { message: `Something went wrong: ${error.message}` } });
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

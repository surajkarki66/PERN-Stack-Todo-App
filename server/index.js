const express = require("express");
const cors = require("cors");
const app = express();

const pool = require("./db");

//middlewares
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

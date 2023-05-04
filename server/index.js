const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "teatteri",
  connectionLimit: 10, // Set connection limit to avoid overloading the server
});

// Test the database connection
pool
  .getConnection()
  .then((connection) => {
    console.log(`Connected to MySQL database: ${connection.config.database}`);
    connection.release();
  })
  .catch((error) => {
    console.error("Error connecting to MySQL database: ", error);
  });

// Define your API routes here
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/categories", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT id, image_path, name FROM category"
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching categories: ", error);
    res.sendStatus(500);
  }
});

app.get("/subcategories/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT id, image_path, name FROM subcategory WHERE category_id = ?",
      [categoryId]
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error(
      `Error fetching subcategories for category ${categoryId}: `,
      error
    );
    res.sendStatus(500);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

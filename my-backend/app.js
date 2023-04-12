const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Replace the placeholder values with your own database credentials
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "Dcord2001!",
  database: "culture_db",
};

// Login route
app.post("/api/login", async (req, res) => {
  console.log("Login request received:", req.body);

  const { username, password } = req.body;

  // Connect to the database and fetch the user
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    connection.end();

    if (rows.length === 0) {
      console.log("User not found:", username);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = rows[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log("Invalid password for user:", username);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("User authenticated, sending token:", token);
    res.json({ token });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res
      .status(500)
      .json({ error: "An error occurred while accessing the database." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

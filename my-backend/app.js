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

//Register route
app.post("/api/register", async (req, res) => {
  console.log("Registration request received:", req.body);

  const {
    email,
    username,
    password,
    first_name,
    last_name,
    preferred_name,
    age,
    gender,
    languages_spoke,
    birth_country,
    countries_worked,
    countries_lived,
    countries_studied,
    countries_volunteered,
    countries_traveled,
    countries_bucket,
  } = req.body.formData;

  // Check for null values
  if (
    email === null ||
    username === null ||
    password === null ||
    first_name === null ||
    last_name === null ||
    preferred_name === null ||
    age === null ||
    gender === null ||
    languages_spoke === null ||
    birth_country === null ||
    countries_worked === null ||
    countries_lived === null ||
    countries_studied === null ||
    countries_volunteered === null ||
    countries_traveled === null ||
    countries_bucket === null
  ) {
    console.log("Null value found in form data");
    return res.status(400).json({ error: "Form data contains a null value" });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Hash the password and insert the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    await connection.execute(
      "INSERT INTO users (email, username, first_name, last_name, preferred_name, gender, languages_spoke, birth_country, countries_worked, countries_lived, countries_studied, countries_volunteered, countries_traveled, countries_bucket, password, age) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        email,
        username,
        first_name,
        last_name,
        preferred_name,
        gender,
        languages_spoke,
        birth_country,
        countries_worked,
        countries_lived,
        countries_studied,
        countries_volunteered,
        countries_traveled,
        countries_bucket,
        hashedPassword,
        age,
      ]
    );
    connection.end();

    // Automatically log the user in and send a token
    const token = jwt.sign({ userId: username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("User registered, sending token:", token);
    res.json({ token });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res
      .status(500)
      .json({ error: "An error occurred while accessing the database." });
  }
});

app.post("/api/check-email-username", async (req, res) => {
  const { email, username } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username]
    );
    connection.end();

    if (rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Email or username already in use" });
    }

    res.json({ message: "Email and username are available" });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res
      .status(500)
      .json({ error: "An error occurred while accessing the database." });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  console.log("Login request received:", req.body);

  const { username, password } = req.body;
  console.log(username);

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

    const token = jwt.sign({ userId: username }, process.env.JWT_SECRET, {
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

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.userId = decoded.userId;
    console.log(req.userId);
    return next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

//User profile data
app.get("/api/user-profile", authMiddleware, async (req, res) => {
  try {
    console.log(req.userId);
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [req.userId]
    );
    connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = rows[0];
    delete user.password; // Remove sensitive data before sending the response
    res.json(user);
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

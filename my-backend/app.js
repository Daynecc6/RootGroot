const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Fake users data
const users = [
  {
    id: 1,
    username: "user",
    password: "$2y$10$P067Gxdr1gqPavdXbPel8.9rIVDL4p7A8ta9BuKRdEPNZDv3hHYFG", // bcrypt hash for the password "password"
  },
];

// Login route
app.post("/api/login", async (req, res) => {
  console.log("Login request received:", req.body);

  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    console.log("User not found:", username);
    return res.status(400).json({ error: "Invalid credentials" });
  }

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
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

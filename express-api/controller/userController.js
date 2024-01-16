const db = require("../config/db");

const bcrypt = require("bcryptjs");
const saltRounds = 10; // You can adjust the number of salt rounds based on your security requirements

const registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      address,
      phone_number,
      role,
      services,
      coordinates,
    } = req.body;

    // Validate password
    if (!password || typeof password !== "string") {
      throw new Error("Invalid password");
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Example SQL query for user registration
    const result = await db.one(
      "INSERT INTO users (username, email, password, address, phone_number, role, services, coordinates_lat, coordinates_lng) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
      [
        username,
        email,
        hashedPassword,
        address,
        phone_number,
        role,
        services,
        coordinates.latitude,
        coordinates.longitude,
      ]
    );

    res.status(200).send(`User registered successfully with ID: ${result.id}`);
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).send(`Error registering user: ${error.message}`);
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Example SQL query for user login
    const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user) {
      // Compare hashed password with the provided password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        res.status(200).json({ message: "User logged in successfully", user });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).send("Error logging in");
  }
};
const getAllUsers = async (req, res) => {
  try {
    // Example SQL query to fetch all users
    const users = await db.any("SELECT * FROM users");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Error fetching users");
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};

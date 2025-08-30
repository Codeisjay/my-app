import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model("User", userSchema);

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed });
    await user.save();
    res.json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "No token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
};

// Protected route
app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You accessed a protected route!", user: req.user });
});

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running...");
});

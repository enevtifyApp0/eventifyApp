import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import BookModel from "./Models/BookModel.js";
import EventModel from "./Models/EventModel.js";
import bcrypt from "bcrypt";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
const connectString =
  "mongodb+srv://shooq:admin2025@eventcluster.izzwyc2.mongodb.net/eventapp?retryWrites=true&w=majority&appName=EventCluster";

mongoose
  .connect(connectString)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads", express.static(__dirname + "/uploads"));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// -------- ROUTES --------

// Register
app.post("/registerUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send({ user, msg: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ error: "Registration error." });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found." });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ error: "Authentication failed." });

    res.status(200).json({ user, message: "Login successful." });
  } catch (err) {
    res.status(500).json({ error: "Login error." });
  }
});

// Logout
app.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully." });
});

// Update User Profile (with profile picture)
app.put(
  "/updateUserProfile/:email",
  upload.single("profilePic"),
  async (req, res) => {
    const email = req.params.email;
    const { name, password } = req.body;

    try {
      const userToUpdate = await UserModel.findOne({ email });
      if (!userToUpdate)
        return res.status(404).json({ error: "User not found" });

      if (req.file) {
        const newPic = req.file.filename;
        if (userToUpdate.profilePic) {
          const oldPath = path.join(
            __dirname,
            "uploads",
            userToUpdate.profilePic
          );
          fs.unlink(oldPath, (err) => {
            if (err) console.error("Error deleting old profile picture:", err);
          });
        }
        userToUpdate.profilePic = newPic;
      }

      userToUpdate.name = name;

      if (password !== userToUpdate.password) {
        const hashed = await bcrypt.hash(password, 10);
        userToUpdate.password = hashed;
      }

      await userToUpdate.save();
      res.send({ user: userToUpdate, msg: "Updated." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Save Book
app.post("/saveBook", async (req, res) => {
  try {
    const { bookMsg, email } = req.body;
    const book = new BookModel({ bookMsg, email });
    await book.save();
    res.status(201).send({ book, msg: "Book saved successfully." });
  } catch (error) {
    res.status(500).json({ error: "Saving book error." });
  }
});

// Get Books
app.get("/getBooks", async (req, res) => {
  try {
    const books = await BookModel.find().sort({ createdAt: -1 });
    const count = await BookModel.countDocuments();
    res.send({ books, count });
  } catch (error) {
    res.status(500).json({ error: "Fetching books error." });
  }
});

// Add Event
app.post("/addEvent", async (req, res) => {
  try {
    const { image, title, description, date, location, price, type } = req.body;
    const event = new EventModel({
      image,
      title,
      description,
      date,
      location,
      price,
      type,
    });
    await event.save();
    res.status(201).send({ event, msg: "Event added successfully." });
  } catch (error) {
    res.status(500).json({ error: "Adding event failed" });
  }
});

// Get Events
app.get("/events", async (req, res) => {
  try {
    const events = await EventModel.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Fetching events error." });
  }
});

// Start server
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});

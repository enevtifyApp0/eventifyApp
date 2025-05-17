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
import * as ENV from "./config.js";

const app = express();

//Middleware
const corsOptions = {
  origin: ENV.CLIENT_URL, //client URL local
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cors());

// MongoDB connection
const connectString =
  // "mongodb+srv://shooq:admin2025@eventcluster.izzwyc2.mongodb.net/eventapp?retryWrites=true&w=majority&appName=EventCluster";

  // "mongodb+srv://eventifyapp92:event2025@cluster0.qwaahhn.mongodb.net/eventDB?retryWrites=true&w=majority&appName=Cluster0";
  `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

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
    const userType = req.body.userType;
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

      // Update user's name
      userToUpdate.name = name;
      //if there is a value of userType in the request assign the new value
      if (userType) userToUpdate.userType = userType;
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
    const { bookMsg, email, eventTitle, quantity, totalAmount } = req.body;

    const book = new BookModel({
      bookMsg,
      email,
      eventTitle,
      quantity,
      totalAmount,
    });

    await book.save();
    res.status(201).send({ book, msg: "Book saved successfully." });
  } catch (error) {
    console.error("Saving book error:", error);
    res.status(500).json({ error: "Saving book error." });
  }
});

// Get Books
app.get("/getBooks", async (req, res) => {
  try {
    const books = await BookModel.find().sort({ createdAt: -1 });
    res.send({ books });
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

// GET API - getUsers
app.get("/getUsers", async (req, res) => {
  try {
    // استرجاع جميع المستخدمين من مجموعة UserModel، مرتبين حسب الاسم تصاعديًا
    const users = await UserModel.find({}).sort({ name: 1 });

    // الحصول على عدد المستخدمين
    const usersCount = await UserModel.countDocuments({});

    // إرسال البيانات كاستجابة
    res.send({ users: users, count: usersCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Api to Delete User
app.delete("/deleteUser/:id/", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
});

//GET API - for retrieving a single user
app.get("/getUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // Find the user by _id
    const user = await UserModel.findById(id);
    res.send({ user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Start server
const port = ENV.PORT || 3001;

app.listen(port, () => {
  console.log(`You are Server running on port: ${port}`);
});

import mongoose from "mongoose";
import EventModel from "./Models/EventModel.js"; // Adjust path as necessary

const connectString = "your_mongo_connection_string"; // Replace with your MongoDB connection string

const sampleEvents = [
  {
    title: "Concert Night",
    date: new Date("2023-12-01T20:00:00Z"),
    location: "Downtown Arena",
    description: "A night filled with live music performances.",
    price: 50,
    type: "concert",
  },
  {
    title: "Tech Conference 2023",
    date: new Date("2023-11-15T09:00:00Z"),
    location: "Convention Center",
    description: "Join us for a day of tech talks and networking.",
    price: 200,
    type: "conference",
  },
  {
    title: "Art Exhibition",
    date: new Date("2023-10-10T18:00:00Z"),
    location: "Art Gallery",
    description: "Explore the latest works from local artists.",
    price: 20,
    type: "exhibition",
  },
];

const seedEvents = async () => {
  try {
    await mongoose.connect(connectString);
    console.log("MongoDB connected");

    await EventModel.deleteMany({}); // Optional: Clear existing events
    await EventModel.insertMany(sampleEvents);
    console.log("Sample events added successfully.");
  } catch (error) {
    console.error("Error adding sample events:", error);
  } finally {
    mongoose.connection.close();
  }
};

sampleEvents();
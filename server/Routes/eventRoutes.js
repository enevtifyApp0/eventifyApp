// // Routes/eventRoutes.js
// import express from "express";
// import EventModel from "../Models/EventModel.js";
// const router = express.Router();

// // Create an event
// router.post("/createEvent", async (req, res) => {
//   try {
//     const { image, title, description, date, location, price, type } = req.body;

//     // Validate that price is a positive number
//     if (price <= 0) {
//       return res
//         .status(400)
//         .json({ error: "Price must be a positive number." });
//     }

//     const event = new EventModel({
//       image,
//       title,
//       date,
//       location,
//       description,
//       price,
//       type,
//     });
//     await event.save();
//     res.status(201).json({ event, message: "Event created successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error creating event." });
//   }
// });

// // Get all events
// router.get("/", async (req, res) => {
//   try {
//     const events = await EventModel.find();
//     res.json(events);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error fetching events." });
//   }
// });

// // Book an event (simple implementation)
// router.post("/bookEvent", async (req, res) => {
//   const { eventId, userId } = req.body; // Assuming userId is passed for tracking bookings
//   // TODO: Implement booking logic (e.g., save booking to a database)
//   res
//     .status(200)
//     .json({ message: "Event booked successfully!", eventId, userId });
// });

// export default router;

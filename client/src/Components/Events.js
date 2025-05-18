import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import "./../App.css";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const bookEvent = async (eventId) => {
    try {
      const userId = "exampleUserId"; // يجب تغييره لاحقًا
      await axios.post("http://localhost:3001/api/events/bookEvent", {
        eventId,
        userId,
      });
      alert("Event booked successfully!");
    } catch (error) {
      console.error("Error booking event:", error);
    }
  };

  return (
    <div className="home-container">
      <h1>Upcoming Events</h1>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <img src={event.image} alt={event.title} className="event-image" />
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Location: {event.location}</p>
            <p>Price: OMR {event.price}</p>
            <p>Type: {event.type}</p>
            <Button
              className="book-button"
              onClick={() => bookEvent(event._id)}
            >
              Book Now
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;

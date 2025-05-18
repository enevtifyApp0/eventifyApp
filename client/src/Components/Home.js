import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
import { saveBook } from "../Features/BookSlice";

const Home = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.users.user.email);
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  // جلب الأحداث
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const toggleModal = () => {
    setModal(!modal);
    setTicketQuantity(1);
  };

  const handleBookNow = (event) => {
    setSelectedEvent(event);
    toggleModal();
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    const taxRate = 0.1;
    const ticketPrice = selectedEvent.price * ticketQuantity;
    const totalAmount = ticketPrice + ticketPrice * taxRate;

    try {
      await dispatch(
        saveBook({
          email,
          eventTitle: selectedEvent.title,
          quantity: ticketQuantity,
          totalAmount,
          bookMsg: `Booked ${ticketQuantity} ticket(s) for ${selectedEvent.title}`,
        })
      );

      toggleModal();
      navigate("/books");
    } catch (err) {
      console.error("Booking failed:", err);
      setError("Booking failed. Please try again.");
    }
  };

  return (
    <div className="home-container">
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Upcoming Events
      </h1>

      <div className="events-grid">
        {events.length === 0 ? (
          <p>No events available at the moment</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="event-card">
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-image"
                />
              )}
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Location: {event.location}</p>
              <p>Price: OMR {event.price}</p>
              <p>Type: {event.type}</p>
              <Button
                className="book-button"
                onClick={() => handleBookNow(event)}
              >
                Book Now
              </Button>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Booking Details</ModalHeader>
        <ModalBody>
          {selectedEvent && (
            <>
              <h3>{selectedEvent.title}</h3>
              <p>{selectedEvent.description}</p>
              <p>Date: {new Date(selectedEvent.date).toLocaleDateString()}</p>
              <p>Location: {selectedEvent.location}</p>
              <p>Price per ticket: OMR {selectedEvent.price}</p>
              <div className="form-group">
                <label>Number of Tickets</label>
                <input
                  type="number"
                  value={ticketQuantity}
                  onChange={(e) =>
                    setTicketQuantity(Math.max(1, e.target.value))
                  }
                  min="1"
                  required
                />
              </div>
              <p>
                Total Price (including tax): OMR{" "}
                {(selectedEvent.price * ticketQuantity * 1.1).toFixed(2)}
              </p>
            </>
          )}
          <form onSubmit={handlePayment}>
            <div className="form-group" style={{ position: "relative" }}>
              <label>Card Number</label>
              <FaCreditCard
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#007bff",
                  fontSize: "1.2rem",
                }}
              />
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                style={{ width: "100%", paddingRight: "35px" }}
              />
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
            {error && <div className="error">{error}</div>}
            <Button type="submit" color="primary">
              Pay Now
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { saveBook } from "../Features/BookSlice";
import "./BookingPay.css";

const Payment = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.users.user.email);

  const [event, setEvent] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/events/${eventId}`
        );
        setEvent(response.data);
      } catch (err) {
        setError("Failed to fetch event details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const bookData = {
        email,
        eventTitle: event.title,
        quantity: 1,
        totalAmount: event.price,
        bookMsg: `Booked 1 ticket for ${event.title}`,
      };

      await dispatch(saveBook(bookData));
      navigate("/books");
    } catch (err) {
      console.error("Booking failed:", err);
      setError("Booking failed. Please try again.");
    }
  };

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!event) return <div>No event found.</div>;

  return (
    <div className="booking-payment-container">
      <h1>Booking and Payment Details</h1>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Location: {event.location}</p>
      <p>Price: OMR {event.price}</p>

      <form onSubmit={handlePayment}>
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
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
        <button type="submit" className="btn btn-success">
          Pay & Book
        </button>
      </form>
    </div>
  );
};

export default Payment;

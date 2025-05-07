import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookingPay.css'; // Ensure you have a CSS file for styling

const Payment = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // State to manage loading

  // Fetch event data from API
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/events/${eventId}`);
        setEvent(response.data);
      } catch (err) {
        setError('Failed to fetch event details.');
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchEvent();
  }, [eventId]);

  const handlePayment = (e) => {
    e.preventDefault();
    alert(`Payment processed for ${event.title} with ID: ${eventId}`);
  };

  if (loading) {
    return <div>Loading event details...</div>; // Loading state
  }

  if (error) {
    return <div className="error">{error}</div>; // Error state
  }

  if (!event) {
    return <div>No event found.</div>; // Fallback if no event data
  }

  return (
    <div className="booking-payment-container">
      <h1>Booking and Payment Details</h1>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Location: {event.location}</p>
      <p>Price: ${event.price}</p>
      
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
        <button type="submit" className="btn btn-success">Pay</button>
      </form>
    </div>
  );
};

export default Payment;
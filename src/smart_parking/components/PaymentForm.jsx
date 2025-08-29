import React, { useState } from 'react';

const PaymentForm = ({ onPay }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPay(cardNumber);
  };

  return (
    <section id="payment">
      <h2>Mobile Payment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="card-number">Card Number:</label>
        <input
          type="text"
          id="card-number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
        />
        <label htmlFor="expiry-date">Expiry Date:</label>
        <input
          type="text"
          id="expiry-date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          placeholder="MM/YY"
        />
        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          id="cvv"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          placeholder="123"
        />
        <button type="submit">Pay Now</button>
      </form>
    </section>
  );
};

export default PaymentForm;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BankPayment = ({ onPaymentSuccess }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState(0);
  const [pin, setPin] = useState(''); // State for PIN
  const [showPinStep, setShowPinStep] = useState(false); // Toggle PIN step
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle Step 1: Validate card details and amount
  const handleAddMoney = (e) => {
    e.preventDefault();

    // Validate card number (16 digits)
    if (!/^\d{16}$/.test(cardNumber)) {
      setError('Invalid card number. Please enter a 16-digit card number.');
      return;
    }

    // Validate expiry date (MM/YY format)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      setError('Invalid expiry date. Please use the MM/YY format.');
      return;
    }

    // Validate CVV (3 or 4 digits)
    if (!/^\d{3,4}$/.test(cvv)) {
      setError('Invalid CVV. Please enter a 3 or 4-digit CVV.');
      return;
    }

    // Validate amount (positive number)
    if (amount <= 0) {
      setError('Invalid amount. Please enter a positive number.');
      return;
    }

    // Clear any previous errors
    setError('');

    // Proceed to Step 2: Show PIN input
    setShowPinStep(true);
  };

  // Handle Step 2: Validate PIN and process payment
  const handlePinSubmit = (e) => {
    e.preventDefault();

    // Validate PIN (4 digits)
    if (!/^\d{4}$/.test(pin)) {
      setError('Invalid PIN. Please enter a 4-digit PIN.');
      return;
    }

    // Clear any previous errors
    setError('');

    // Simulate successful payment
    onPaymentSuccess(amount);
    alert('Payment successful! Amount added to your wallet.');
    navigate('/'); // Redirect back to the main page
  };

  return (
    <div className="bank-payment">
      <h2>Add Money to Wallet</h2>

      {/* Step 1: Card Details and Amount */}
      {!showPinStep && (
        <form onSubmit={handleAddMoney}>
          <label htmlFor="card-number">Card Number:</label>
          <input
            type="text"
            id="card-number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            maxLength={16} // Limit to 16 digits
            required
          />

          <label htmlFor="expiry-date">Expiry Date:</label>
          <input
            type="text"
            id="expiry-date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            maxLength={5} // Limit to 5 characters (MM/YY)
            required
          />

          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            maxLength={4} // Limit to 4 digits
            required
          />

          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Enter amount"
            min="1" // Ensure the amount is at least 1
            required
          />

          {/* Display error message if any */}
          {error && <p className="error">{error}</p>}

          <button type="submit">Add Money</button>
        </form>
      )}

      {/* Step 2: PIN Verification */}
      {showPinStep && (
        <form onSubmit={handlePinSubmit}>
          <label htmlFor="pin">Enter 4-Digit PIN:</label>
          <input
            type="password"
            id="pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter 4-digit PIN"
            maxLength={4} // Limit to 4 digits
            required
          />

          {/* Display error message if any */}
          {error && <p className="error">{error}</p>}

          <button type="submit">Confirm Payment</button>
        </form>
      )}
    </div>
  );
};

export default BankPayment;
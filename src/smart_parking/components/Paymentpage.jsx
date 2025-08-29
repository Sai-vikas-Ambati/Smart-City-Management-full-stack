import React from 'react';
import Wallet from './Wallet';
import '../index.css'; // Corrected import path

function Paymentpage({ walletBalance, onAddMoney, totalCost, onPay }) {
  return (
    <div className="payment-page">
      <div className="left-side">
        <h2>Payment Details</h2>
        {totalCost > 0 ? (
          <div>
            <p>Total Cost: ₹{totalCost}</p>
            <button onClick={onPay}>Pay from Wallet</button>
          </div>
        ) : (
          <p>No active booking or payment required.</p>
        )}
      </div>
      <div className="right-side">
        <Wallet walletBalance={walletBalance} onAddMoney={onAddMoney} />
      </div>
    </div>
  );
}

export default Paymentpage;
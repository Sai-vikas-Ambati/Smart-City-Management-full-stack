import React from 'react';

const Wallet = ({ walletBalance, onAddMoney }) => {
  return (
    <section id="wallet">
      <h2>Wallet</h2>
      <p>Current Balance: ₹{walletBalance}</p>
      <button onClick={onAddMoney}>Add Money</button>
    </section>
  );
};

export default Wallet;
import React from 'react';

const WalletBalance = ({ walletBalance }) => {
  return (
    <div className="wallet-balance">
      <h2>Wallet Balance</h2>
      <p>Your current wallet balance is: <strong>₹{walletBalance}</strong></p>
    </div>
  );
};

export default WalletBalance;
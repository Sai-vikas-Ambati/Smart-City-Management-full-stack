import React from 'react';

const Pricing = ({ currentPrice }) => {
  return (
    <section id="pricing">
      <h2>Dynamic Pricing</h2>
      <p>
        Current Price: <span id="current-price">₹{currentPrice} - 5 min</span>
      </p>
      <p>Prices may vary based on demand and peak hours.</p>
    </section>
  );
};

// Usage example
const App = () => {
  return <Pricing currentPrice={2.5} />;
};

export default App;

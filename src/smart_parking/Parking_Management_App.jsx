import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ParkingMap from './components/ParkingMap';
import ReservationForm from './components/ReservationForm';
import Pricing from './components/Pricing';
import Wallet from './components/Wallet';
import Paymentpage from './components/Paymentpage';
import BankPayment from './components/BankPayment';
import WalletBalance from './components/WalletBalance'; // Import the new component
import parkingLotImage from './components/parking-lot.jpg';
import './index.css';

function App() {
  const [spots, setSpots] = useState([
    { id: 1, status: 'available', bookingTime: null },
    { id: 2, status: 'available', bookingTime: null },
    { id: 3, status: 'available', bookingTime: null },
    { id: 4, status: 'available', bookingTime: null },
    { id: 5, status: 'available', bookingTime: null },
    { id: 6, status: 'available', bookingTime: null },
    { id: 7, status: 'available', bookingTime: null },
    { id: 8, status: 'available', bookingTime: null },
    { id: 9, status: 'available', bookingTime: null },
  ]);
  const [walletBalance, setWalletBalance] = useState(0); // Wallet starts at 0
  const [selectedSpot, setSelectedSpot] = useState(null); // For booking
  const [exitingSpot, setExitingSpot] = useState(null); // For exiting
  const [totalCost, setTotalCost] = useState(0);

  // Handle spot selection for booking
  const handleSpotSelection = (spotId) => {
    const spot = spots.find((s) => s.id === spotId);
    if (spot.status === 'available') {
      setSelectedSpot(spotId);
    } else {
      alert('This spot is already occupied. Please select another spot.');
    }
  };

  // Handle booking confirmation
  const handleBooking = (reservationTime) => {
    if (!selectedSpot) {
      alert('Please select a spot first.');
      return;
    }
    const updatedSpots = spots.map((spot) =>
      spot.id === selectedSpot
        ? { ...spot, status: 'occupied', bookingTime: new Date(reservationTime) }
        : spot
    );
    setSpots(updatedSpots);
    setSelectedSpot(null); // Reset selected spot after booking
    alert(`Booking confirmed for Spot ${selectedSpot} at ${reservationTime}`);
  };

  // Handle spot selection for exit
  const handleExitSelection = (spotId) => {
    const spot = spots.find((s) => s.id === spotId);
    if (spot.status === 'occupied') {
      setExitingSpot(spotId); // Set the spot to exit
    } else {
      alert('This spot is already available. Please select an occupied spot.');
    }
  };

  // Handle exit and calculate cost
  const handleExit = () => {
    if (!exitingSpot) {
      alert('Please select a spot to exit.');
      return;
    }

    const spot = spots.find((s) => s.id === exitingSpot);
    if (!spot.bookingTime) {
      alert('No booking time found for this spot.');
      return;
    }

    // Calculate total cost
    const exitTime = new Date();
    const timeDiff = (exitTime - spot.bookingTime) / (1000 * 60); // Time difference in minutes
    const cost = Math.ceil(timeDiff / 5) * 2.5; // ₹2.5 for every 5 minutes
    setTotalCost(cost);

    // Free up the spot
    const updatedSpots = spots.map((spot) =>
      spot.id === exitingSpot ? { ...spot, status: 'available', bookingTime: null } : spot
    );
    setSpots(updatedSpots);
    setExitingSpot(null); // Reset exiting spot after exit

    alert(`Total parking time for Spot ${exitingSpot}: ${timeDiff.toFixed(2)} minutes. Total cost: ₹${cost}`);
  };

  // Handle payment from wallet
  const handlePayment = () => {
    if (walletBalance < totalCost) {
      alert('Insufficient wallet balance. Please add money to your wallet.');
      return;
    }
    setWalletBalance(walletBalance - totalCost);
    alert(`Payment successful. ₹${totalCost} deducted from your wallet.`);
    setTotalCost(0);
  };

  return (
    <Router>
      <div className="App" style={{ backgroundImage: `url(${parkingLotImage})` }}>
        <header className = "heading">
          <h1>Smart Parking Solutions</h1>
          <p>Find available parking spaces in real-time and save time!</p>
          <nav>
            <Link to="/">Home</Link> | <Link to="/wallet-balance">Check Wallet Balance</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ParkingMap
                    spots={spots}
                    onSpotSelect={handleSpotSelection}
                    onExitSelect={handleExitSelection}
                  />
                  <ReservationForm
                    spots={spots}
                    onReserve={handleBooking}
                    selectedSpot={selectedSpot}
                  />
                  <Pricing />
                  <button onClick={handleExit}>Exit Parking</button>
                  {totalCost > 0 && (
                    <Paymentpage
                      walletBalance={walletBalance}
                      onAddMoney={() => (window.location.href = '/bank-payment')}
                      totalCost={totalCost}
                      onPay={handlePayment}
                    />
                  )}
                </>
              }
            />
            <Route
              path="/bank-payment"
              element={
                <BankPayment
                  onPaymentSuccess={(amount) => setWalletBalance(walletBalance + amount)}
                />
              }
            />
            <Route
              path="/wallet-balance"
              element={<WalletBalance walletBalance={walletBalance} />}
            />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2023 Smart Parking Solutions. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
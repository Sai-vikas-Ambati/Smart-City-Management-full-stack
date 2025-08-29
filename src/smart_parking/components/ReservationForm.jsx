import React, { useState, useEffect } from 'react';

const ReservationForm = ({  onReserve, selectedSpot }) => {
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [today, setToday] = useState(''); // State to store today's date

  // Update today's date dynamically based on local time zone
  useEffect(() => {
    const updateToday = () => {
      const now = new Date();
      // Get local date in YYYY-MM-DD format
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(now.getDate()).padStart(2, '0');
      const todayDate = `${year}-${month}-${day}`;
      setToday(todayDate);
    };

    // Update today's date immediately
    updateToday();

    // Set up an interval to update today's date every minute (optional)
    const intervalId = setInterval(updateToday, 60000); // Update every minute

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSpot) {
      alert('Please select a spot first.');
      return;
    }
    onReserve(`${reservationDate} ${reservationTime}`);
  };

  return (
    <section id="reservation">
      <h2>Reserve Your Parking Spot</h2>
      {selectedSpot && (
        <p>
          <strong>Selected Spot:</strong> {selectedSpot}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reservation-date">
            Reservation Date: 
            <span role="img" aria-label="calendar" style={{ fontSize: '1.5em', color: 'blue' }}> 📅 </span>
          </label>
          <input
            type="date"
            id="reservation-date"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
            min={today} // Set the minimum date to today
            max={today} // Set the maximum date to today
            required
          />
        </div>
        <div>
          <label htmlFor="reservation-time">
            Reservation Time:
          </label>
          <input
            type="time"
            id="reservation-time"
            value={reservationTime}
            onChange={(e) => setReservationTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Confirm Booking</button>
      </form>
    </section>
  );
};

export default ReservationForm;
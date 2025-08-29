import React from 'react';

const ParkingMap = ({ spots, onSpotSelect, onExitSelect }) => {
  return (
    <section id="availability">
      <h2>Real-Time Parking Availability</h2>
      <div id="parking-map">
        {spots.map((spot) => (
          <div
            key={spot.id}
            className={`parking-spot ${spot.status}`}
            onClick={() => {
              if (spot.status === 'available') {
                onSpotSelect(spot.id); // Select for booking
              } else {
                onExitSelect(spot.id); // Select for exit
              }
            }}
          >
            {spot.status === 'available' ? 'Available' : `Occupied (Spot ${spot.id})`}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ParkingMap;
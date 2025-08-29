import React, { useEffect, useState } from 'react';

const ArrivalTimes = ({ selectedVehicleType, selectedVehicle }) => {
  const [predictedArrival, setPredictedArrival] = useState(null);

  useEffect(() => {
    if (selectedVehicleType && selectedVehicle) {
      const baseTravelTime = Math.floor(Math.random() * 10) + 5; // Predictive travel time between 5-15 mins
      setPredictedArrival({
        id: selectedVehicle.id,
        from: selectedVehicle.from,
        to: selectedVehicle.to,
        predictedArrivalTime: `${baseTravelTime} mins`,
      });
    } else {
      setPredictedArrival(null); // Empty initially
    }
  }, [selectedVehicleType, selectedVehicle]);

  return (
    <ul className="arrivals-list">
      {predictedArrival && (
        <li key={predictedArrival.id}>
          {predictedArrival.id} - {predictedArrival.from} → {predictedArrival.to} | Predicted Arrival: {predictedArrival.predictedArrivalTime}
        </li>
      )}
    </ul>
  );
};

export default ArrivalTimes;

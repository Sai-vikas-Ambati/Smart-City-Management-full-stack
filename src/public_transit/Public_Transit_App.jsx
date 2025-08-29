import React, { useState } from 'react';
import CabTracker from './components/CabTracker';
import TrainTracker from './components/TrainTracker';
import ArrivalTimes from './components/ArrivalTimes';
import Notifications from './components/Notifications';
import './index1.css'

function App() {
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <div className="app">
      <h1 className="main-heading">Real-Time Public Transit Updates</h1>
      <div className="sections">
        <section className="section">
          <h2>Cab Tracking</h2>
          <CabTracker
            setSelectedVehicleType={setSelectedVehicleType}
            setSelectedVehicle={setSelectedVehicle}
          />
        </section>
        <section className="section">
          <h2>Train Tracking</h2>
          <TrainTracker
            setSelectedVehicleType={setSelectedVehicleType}
            setSelectedVehicle={setSelectedVehicle}
          />
        </section>
      </div>
      <section className="section">
        <h2>Arrival Times</h2>
        <ArrivalTimes
          selectedVehicleType={selectedVehicleType}
          selectedVehicle={selectedVehicle}
        />
      </section>
      <section className="section">
        <h2>Notifications</h2>
        <Notifications />
      </section>
    </div>
  );
}

export default App;

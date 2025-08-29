import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import SearchFilter from './SearchFilter';
import trainData from './vehicles.json'; // ✅ Import JSON directly
import 'leaflet/dist/leaflet.css';

const trainIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/kml/paddle/blu-circle.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const TrainTracker = ({ setSelectedVehicleType, setSelectedVehicle }) => {
  const [trains, setTrains] = useState([]);
  const [filteredTrains, setFilteredTrains] = useState([]);

  useEffect(() => {
    setTrains(trainData.trains); // ✅ Set data from imported JSON
  }, []);

  useEffect(() => {
    setSelectedVehicleType('train');
  }, [setSelectedVehicleType]);

  return (
    <div className="tracker-container">
      <SearchFilter
        type="train"
        data={trains}
        setFilteredData={setFilteredTrains}
        setSelectedVehicle={setSelectedVehicle}
      />
      <MapContainer center={[11.0140, 76.9660]} zoom={12} className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredTrains.length > 0 &&
          filteredTrains.map((train) => (
            <Marker key={train.id} position={[train.latitude, train.longitude]} icon={trainIcon}>
              <Popup>{train.location}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default TrainTracker;

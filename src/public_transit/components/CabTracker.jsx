import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import SearchFilter from "./SearchFilter";
import "leaflet/dist/leaflet.css";
import vehiclesData from "./vehicles.json"; // Import JSON directly

const CabTracker = ({ setSelectedVehicleType, setSelectedVehicle }) => {
  const [cabs, setCabs] = useState([]);
  const [filteredCabs, setFilteredCabs] = useState([]);

  useEffect(() => {
    setCabs(vehiclesData.cabs || []);
  }, []);

  useEffect(() => {
    setSelectedVehicleType("cab");
  }, [setSelectedVehicleType]);

  return (
    <div className="tracker-container">
      <SearchFilter
        type="cab"
        data={cabs}
        setFilteredData={setFilteredCabs}
        setSelectedVehicle={setSelectedVehicle}
      />
      <MapContainer center={[11.0168, 76.9558]} zoom={12} className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredCabs.length > 0 &&
          filteredCabs.map((cab) => (
            <Marker
              key={cab.id}
              position={[cab.latitude, cab.longitude]}
              icon={L.icon({
                iconUrl: "https://maps.google.com/mapfiles/kml/paddle/blu-circle.png", // Default Leaflet icon
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
              })}
            >
              <Popup>{cab.location}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default CabTracker;

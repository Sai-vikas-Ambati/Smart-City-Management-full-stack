import React from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ route, startCoords, endCoords }) => {
  return (
    <MapContainer center={[11.0008, 76.9664]} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Show Start Location Marker */}
      {startCoords && (
        <Marker position={startCoords} />
      )}

      {/* Show End Location Marker */}
      {endCoords && (
        <Marker position={endCoords} />
      )}

      {/* Draw the Route */}
      {route.length > 0 && <Polyline positions={route} color="blue" />}
    </MapContainer>
  );
};

export default MapComponent;

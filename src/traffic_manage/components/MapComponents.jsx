import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapComponents.css"; // New CSS for animations

const customMarker = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Custom map marker
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -45],
});

const MapComponent = ({ coords, location, route, trafficRoute, destination }) => {
  useEffect(() => {
    console.log("Route updated:", route);
    console.log("Traffic Route updated:", trafficRoute);
  }, [route, trafficRoute]);

  return (
    <div className="map-container">
      <MapContainer center={coords} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={coords} icon={customMarker}>
          <Popup>{location || "Start Location"}</Popup>
        </Marker>

        {destination && (
          <Marker position={destination} icon={customMarker}>
            <Popup>Destination</Popup>
          </Marker>
        )}

        {route.length > 0 && (
          <Polyline positions={route} color="blue" weight={4} className="route-animation" />
        )}

        {trafficRoute.length > 0 && (
          <Polyline positions={trafficRoute} color="red" weight={4} className="route-animation" />
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;

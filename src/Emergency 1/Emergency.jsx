import React, { useState } from "react";
import MapComponent from "./components/MapComponent.jsx";
import { fetchRouteData } from "./utils.jsx";
import "./estyles.css";

const App = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [timeLimit, setTimeLimit] = useState(""); // NEW state for time input
  const [route, setRoute] = useState([]);
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRoute = async () => {
    if (!startLocation.trim() || !endLocation.trim() || !timeLimit) {
      alert("Please enter both locations and a time constraint!");
      return;
    }

    setLoading(true);
    try {
      const { routeCoords, startPoint, endPoint } = await fetchRouteData(startLocation, endLocation, parseInt(timeLimit));
      
      setRoute(routeCoords || []);
      setStartCoords(startPoint || null);
      setEndCoords(endPoint || null);
    } catch (error) {
      alert(error);
      setRoute([]);
      setStartCoords(null);
      setEndCoords(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1 className="app-title">Emergency Transport Route Finder</h1>

      <div className="input-section">
        <input
          type="text"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          placeholder="Enter Start Location"
        />
      </div>

      <div className="input-section">
        <input
          type="text"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          placeholder="Enter Destination"
        />
      </div>

      <div className="input-section">
        <input
          type="number"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
          placeholder="Enter Max Time (minutes)"
        />
      </div>

      <button onClick={fetchRoute} disabled={loading}>
        {loading ? "Loading..." : "Show Route"}
      </button>

      <MapComponent route={route} startCoords={startCoords} endCoords={endCoords} />
    </div>
  );
};

export default App;

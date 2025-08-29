import axios from "axios";

// Function to decode polyline
export function decodePolyline(encoded) {
    let index = 0,
        lat = 0,
        lng = 0,
        coordinates = [];

    while (index < encoded.length) {
        let shift = 0, result = 0, byte;
        do {
            byte = encoded.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        let deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
        lat += deltaLat;

        shift = 0;
        result = 0;
        do {
            byte = encoded.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        let deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
        lng += deltaLng;

        coordinates.push([lat / 1e5, lng / 1e5]);
    }

    return coordinates;
}

// Function to fetch normal route
export const fetchRouteData = async (startCoords, endCoords) => {
    try {
      const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${startCoords[1]},${startCoords[0]};${endCoords[1]},${endCoords[0]}?overview=full&geometries=geojson`
      );
  
      if (response.data.routes.length > 0) {
        const routeCoords = response.data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        const duration = response.data.routes[0].duration; // Duration in seconds
  
        return { routeCoords, duration };
      } else {
        console.warn("No route found.");
        return { routeCoords: [], duration: null };
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      return { routeCoords: [], duration: null };
    }
  };
  
// Function to fetch traffic-aware route
export async function fetchTrafficData(start) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/traffic/", {
            start_lat: start[0],
            start_lon: start[1],
        });

        if (response.data.routes?.length > 0 && response.data.routes[0].geometry) {
            return decodePolyline(response.data.routes[0].geometry);
        } else {
            console.error("No traffic data received!");
            return [];
        }
    } catch (error) {
        console.error("Error fetching traffic route:", error);
        return [];
    }
}

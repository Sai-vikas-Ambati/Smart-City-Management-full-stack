import routeData from "./data/routes.json";

export const fetchRouteData = async (start, end, timeLimit) => {
  return new Promise((resolve, reject) => {
    const foundRoute = routeData.find(
      (route) => route.start.toLowerCase() === start.toLowerCase() &&
                 route.end.toLowerCase() === end.toLowerCase()
    );

    if (foundRoute) {
      // Find the best route based on the given time constraint
      const selectedRoute = foundRoute.routes
        .filter(route => route.timeLimit <= timeLimit) // Get all routes within time constraint
        .sort((a, b) => b.timeLimit - a.timeLimit)[0]; // Pick the longest possible within limit

      if (selectedRoute) {
        resolve({
          routeCoords: selectedRoute.coords,
          startPoint: selectedRoute.coords[0],
          endPoint: selectedRoute.coords[selectedRoute.coords.length - 1]
        });
      } else {
        reject("No suitable route found for this time limit.");
      }
    } else {
      reject("Route not found");
    }
  });
};

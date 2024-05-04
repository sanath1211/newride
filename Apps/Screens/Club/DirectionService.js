// DirectionsService.js
import polyline from '@mapbox/polyline';

const GOOGLE_API_KEY = 'AIzaSyBs1_MZ-QLQFfjBgcAqApInR88PnLijfN4'; // Replace with your actual Google API key

/**
 * Fetches directions from Google Directions API and decodes the polyline.
 * @param {string} origin - The starting location as a formatted address or latitude/longitude.
 * @param {string} destination - The destination location as a formatted address or latitude/longitude.
 * @returns {Promise<Object>} A promise that resolves to an object containing route information.
 */
export const fetchDirections = async (origin, destination) => {
  const mode = "driving"; // Adjust as needed (driving, walking, bicycling, transit)
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    if (json.routes.length > 0) {
      const route = json.routes[0];
      const points = route.overview_polyline.points;
      const coordinates = polyline.decode(points).map(point => ({
        latitude: point[0],
        longitude: point[1]
      }));

      const distance = route.legs[0].distance.text;
      const duration = route.legs[0].duration.text;

      return { coordinates, distance, duration };
    }
    return { coordinates: [], distance: '', duration: '' };
  } catch (error) {
    console.error('Google Directions API Error: ', error);
    return { coordinates: [], distance: '', duration: '' };
  }
};

/**
 * Fetches nearby places using Google Places API based on the latitude and longitude.
 * @param {number} latitude - The latitude for the center of the search.
 * @param {number} longitude - The longitude for the center of the search.
 * @param {string} type - The type of place to search for (e.g., 'restaurant', 'gas_station').
 * @returns {Promise<Array>} A promise that resolves to an array of places.
 */
export const fetchPlacesNearby = async (latitude, longitude, type) => {
  const radius = 500; // Search radius in meters
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    if (json.results) {
      return json.results.map(place => ({
        name: place.name,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng
      }));
    }
    return [];
  } catch (error) {
    console.error('Failed to fetch places:', error);
    return [];
  }
};

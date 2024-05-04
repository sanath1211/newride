const GOOGLE_PLACES_API_KEY = 'AIzaSyBs1_MZ-QLQFfjBgcAqApInR88PnLijfN4'; // Replace with your actual API key
const BASE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

/**
 * Fetch places nearby a given location.
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @param {function} callback - A callback to run with the result.
 */
export const getPlacesNearby = async (latitude, longitude, callback) => {
  try {
    const types = ['restaurant', 'mechanic', 'tourist_attraction','hotels','gas_station']; // Types of places you want to fetch
    const radius = 5000; // Search within 5000 meters (5 km)
    
    const promises = types.map(type => 
      fetch(`${BASE_URL}?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${GOOGLE_PLACES_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.results) {
          return data.results.map(place => ({
            name: place.name,
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
            type: type,
          }));
        }
        return [];
      })
    );

    const results = await Promise.all(promises);
    const combinedResults = results.flat(); // Combine results from all types into one array
    callback(combinedResults);
  } catch (error) {
    console.error("Failed to fetch places:", error);
    callback([]);
  }
};

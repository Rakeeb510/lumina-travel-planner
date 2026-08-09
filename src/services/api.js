import axios from 'axios';

export const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateTripItinerary = async (tripData) => {
  const response = await api.post('/api/generate-itinerary', tripData);
  return response.data;
};
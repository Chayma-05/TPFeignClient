import axios from 'axios';

const API_URL = 'http://localhost:8888/SERVICE-VOITURE/voitures';

export const getVoituresByClient = async (clientId) => {
  try {
    const response = await axios.get(`${API_URL}?clientId=${clientId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching voitures:', error);
    throw error;
  }
};

export const getAllVoitures = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching all voitures:', error);
    throw error;
  }
};

export const addVoiture = async (clientId, voiture) => {
  try {
    const response = await axios.post(`${API_URL}/${clientId}`, voiture);
    return response.data;
  } catch (error) {
    console.error('Error adding voiture:', error);
    throw error;
  }
};

export const updateVoiture = async (id, voiture) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, voiture);
    return response.data;
  } catch (error) {
    console.error('Error updating voiture:', error);
    throw error;
  }
};

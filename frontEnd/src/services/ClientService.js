import axios from 'axios';

const API_URL = 'http://localhost:8888/SERVICE-CLIENT/clients';

export const getClients = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

export const getClientById = async (clientId) => {
  try {
    const response = await axios.get(`${API_URL}/${clientId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching client:', error);
    throw error;
  }
};

export const addClient = async (client) => {
  try {
    await axios.post(API_URL, client);
  } catch (error) {
    console.error('Error adding client:', error);
    throw error;
  }
};

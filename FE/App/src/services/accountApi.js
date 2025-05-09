// src/api/productApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/v1';
const getFullAccount = async ()=>{
    try {
        const response = await axios.get(`${API_URL}/account/`);
        console.log(response.data.data)
        return response.data.data;
      } catch (error) {
        console.error('Error fetching account:', error);
        throw error;
      }
}
const login = async () => {
  try {
    const response = await axios.post(`${API_URL}/account/login`);
    console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.error('Error fetching account:', error);
    throw error;
  }
}
const register = async ({data}) => {
  try {
    const response = await axios.post(`${API_URL}/account/register`, data);
    return response.data.status
  } catch (error) {
    console.error('Error fetching account:', error);
    throw error;
  }
}
export default {
    getFullAccount,
    login,
    register
}
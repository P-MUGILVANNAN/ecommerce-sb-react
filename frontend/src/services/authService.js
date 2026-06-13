import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const loginAdmin = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data; // should return { token: '...', email: '...' }
    } catch (error) {
        throw error.response?.data?.message || 'Login failed. Please check your credentials.';
    }
};

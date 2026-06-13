import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const getProducts = async (page = 0, size = 5, search = '', category = '', sortBy = 'id', direction = 'desc') => {
    try {
        const response = await axios.get(API_URL, {
            params: { page, size, search, category, sortBy, direction },
            ...getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error fetching products';
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error fetching product details';
    }
};

export const addProduct = async (productData) => {
    try {
        const response = await axios.post(API_URL, productData, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error adding product';
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, productData, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error updating product';
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error deleting product';
    }
};

export const getDashboardStats = async () => {
    try {
        const response = await axios.get(`${API_URL}/stats`, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error fetching dashboard statistics';
    }
};

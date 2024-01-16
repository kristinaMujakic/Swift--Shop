import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

const api = {
    async registerUser(userData) {
        try {
            const response = await axios.post(`${BASE_URL}/auth/signup`, userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error || 'Registration failed');
        }
    },

    async loginUser(credentials) {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error || 'Login failed');
        }
    },

    async getUserProfile(token) {
        try {
            const response = await axios.get(`${BASE_URL}/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error || 'Failed to fetch user profile');
        }
    },
};

export default api;

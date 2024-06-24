import axiosInstance from '@/plugins/axios';

const removeNullValues = (params) => {
    return Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null));
};

export const login = async (number, password) => {
    try {
        const response = await axiosInstance.post('/login', { number, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async ({ firstName, lastName, email, phone, password }) => {
    try {
        const response = await axiosInstance.post('/register', { first_name: firstName, last_name: lastName, email, number: phone, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getSwapHouses = async (params) => {
    try {
        const filteredParams = removeNullValues(params);
        const response = await axiosInstance.post('/get_swap_houses', filteredParams);
        return response.data;
    } catch (error) {
        throw error;
    }
};

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
export const expressInterest = async (houseId) => {
    try {
        const response = await axiosInstance.post(`/interest/${houseId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addToFavorites = async (houseId) => {
    try {
        const response = await axiosInstance.post(`/favorites/${houseId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getProfileProgress = async () => {
    try {
        const response = await axiosInstance.get('/profile_progress');
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getMyInterests = async () => {
    try {
        const response = await axiosInstance.get('/my_interests');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMyFavorites = async () => {
    try {
        const response = await axiosInstance.get('/my_favorites');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getSwapWithMe = async () => {
    try {
        const response = await axiosInstance.get('/swap_with_me');
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getCompleteInterest = async () => {
    try {
        const response = await axiosInstance.get('/complete_interest');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateDescriptionAndImages = async (description, images) => {
    const formData = new FormData();
    formData.append('description', description);
    images.forEach((image, index) => {
        const file = dataURLtoFile(image, `image${index}.png`);
        formData.append(`house[images][${index}]`, file);
    });

    try {
        const response = await axiosInstance.post('update_description_images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

export const getHouseById = async (houseId) => {
    try {
        const response = await axiosInstance.get(`/get_house_by_id/${houseId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};




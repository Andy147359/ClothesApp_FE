import { axiosInstance } from "./custom.service";
export const authServices = {
    login: async (email, password) => {
        try {
            const response = await axiosInstance.post(`/api/v1/auth/login`, {
                email,
                password,
            });
            return response;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    },
    register: async (email, name, password) => {
        try {
            const response = await axiosInstance.post(`/api/v1/auth/register`, {
                email,
                fullName: name,
                password,
            });
            return response;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    },
    logout: async () => {
        try {
            const response = await axiosInstance.post(`/auth/logout`);
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    },
}
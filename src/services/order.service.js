import { axiosInstance } from "./custom.service";

export const orderServices = {
    createOrder: async (orderData) => {
        try {
            const response = await axiosInstance.post(`/api/v1/orders`, orderData);
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    },
    getAllOrders: async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/orders/user`);
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    },

    updateOrderStatus: async (orderId) => {
        try {
            const response = await axiosInstance.put(`/api/v1/orders/complete/${orderId}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    },
}
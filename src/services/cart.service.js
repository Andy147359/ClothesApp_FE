import { axiosInstance } from "./custom.service";

export const cartServices = {
    addToCartServer: async (userId, productId, quantity = 1) => {
        try {
            const response = await axiosInstance.post(`/api/v1/cart-items`, {
                userId,
                productId,
                quantity,
            });
            return response;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    },
    removeFromCartServer: async (id) => {
        try {
            const response = await axiosInstance.delete(`/api/v1/cart-items/${id}`);
            return response;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    },
    getCartItemsServer: async (userId) => {
        try {
            const response = await axiosInstance.get(`/api/v1/cart-items/user/${userId}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    },

    updateCartItemQuantityServer: async (userId, id, quantity) => {
        try {
            const response = await axiosInstance.put(`/api/v1/cart-items/${id}`, {
                quantity,
            });
            return response;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    }
}
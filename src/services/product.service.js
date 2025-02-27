import { axiosInstance, axiosInstanceMultiPart } from "./custom.service"

export const productServices = {
    getProducts: async () => {
        try {
            const response = await axiosInstance.get(`api/v1/products`,

            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },

    createProduct: async (productData) => {
        try {
            const response = await axiosInstanceMultiPart.post(`api/v1/products`, productData);
            return response;
        } catch (error) {
            console.log("error", error);
        }
    },

    updateProduct: async (id, productData) => {
        try {
            const response = await axiosInstanceMultiPart.put(`api/v1/products/${id}`, productData);
            return response;
        } catch (error) {
            console.log("error", error);
        }
    },

    deleteProduct: async (id) => {
        try {
            const response = await axiosInstance.delete(`api/v1/products/${id}`);
            return response;
        } catch (error) {
            console.log("error", error);

        }
    }

}
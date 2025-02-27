import { create } from 'zustand';
import { productServices } from '../services/product.service';

const useProductStore = create(

    (set) => ({
        // Khởi tạo danh sách sản phẩm rỗng
        products: [],

        // Lấy danh sách sản phẩm từ Backend và thêm vào LocalStorage
        fetchProducts: async () => {
            try {
                const response = await productServices.getProducts();
                console.log("response", response);
                if (response && response.data) {
                    set({ products: response.data });
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        },

        // Thêm sản phẩm mới vào danh sách trong LocalStorage
        addProduct: (product) =>
            set((state) => ({
                products: [...state.products, product],
            })),

        // Cập nhật thông tin sản phẩm trong LocalStorage
        updateProduct: (product) =>
            set((state) => ({
                products: state.products.map((p) => (p.id === product.id ? product : p)),
            })),

        // Xóa sản phẩm khỏi danh sách trong LocalStorage
        removeProduct: (productId) =>
            set((state) => ({
                products: state.products.filter((p) => p.id !== productId),
            })),
    }),
    { name: 'product-storage' }
);

export default useProductStore;

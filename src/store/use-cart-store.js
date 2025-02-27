import { create } from "zustand";
import { cartServices } from "../services/cart.service";

const useCartStore = create((set) => ({
    // Khởi tạo giỏ hàng rỗng
    cart: [],

    // Hàm lấy thông tin giỏ hàng từ Backend
    fetchCartItems: async (userId) => {
        try {
            const response = await cartServices.getCartItemsServer(userId);
            set({ cart: response });
        } catch (error) {
            console.error("Failed to fetch cart items:", error);
        }
    },

    // Hàm xử lí thêm sản phẩm vào giỏ hàng
    addToCart: (item, quantity = 1) =>
        set((state) => {
            // Lấy sản phẩm cần thêm vào giỏ hàng để kiểm tra 
            const existingProductIndex = state.cart.findIndex((cartItem) => cartItem.id === item.id);

            // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
            if (existingProductIndex >= 0) {
                // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
                const updatedCart = [...state.cart];
                const existingProduct = updatedCart[existingProductIndex];

                // Kiểm tra số lượng sản phẩm cần thêm vào giỏ hàng có vượt quá số lượng tồn kho không
                // Nếu không đủ số lượng tồn kho, thì không thay đổi trạng thái
                if (existingProduct.quantity + quantity > item.stock) {
                    alert(`Only ${item.stock} items are available in stock.`);
                    return state;
                }

                // Cập nhật số lượng sản phẩm trong giỏ hàng
                updatedCart[existingProductIndex] = {
                    ...existingProduct,
                    quantity: existingProduct.quantity + quantity,
                };

                return { cart: updatedCart };
            } else {
                // Sản phẩm chưa có trong giỏ hàng, thêm mới vào giỏ hàng

                // Kiểm tra số lượng sản phẩm cần thêm vào giỏ hàng có vượt quá số lượng tồn kho không
                // Nếu không đủ số lượng tồn kho, thì không thay đổi trạng thái
                if (quantity > item.stock) {
                    alert(`Only ${item.stock} items are available in stock.`);
                    return state;
                }

                const newItem = { ...item, quantity };
                return { cart: [...state.cart, newItem] };
            }
        }),

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateCartItemQuantity: (id, newQuantity) =>
        set((state) => {
            const updatedCart = state.cart.map((cartItem) => {
                if (cartItem.id === id) {
                    // Kiểm tra số lượng sản phẩm cần thêm vào giỏ hàng có vượt quá số lượng tồn kho không
                    // Nếu không đủ số lượng tồn kho, thì không thay đổi trạng thái
                    if (newQuantity > cartItem.stock) {
                        alert(`Only ${cartItem.stock} items are available in stock.`);
                        return cartItem;
                    }

                    return { ...cartItem, quantity: newQuantity };
                }

                return cartItem;
            });

            return { cart: updatedCart };
        }),


    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart: (id) =>
        set((state) => ({
            cart: state.cart.filter((cartItem) => cartItem.id !== id),
        })),

}));

export default useCartStore;

import DataTable from './DataTable'
import { useState } from 'react';
import { orderServices } from '../../services/order.service';
import useAuthStore from '../../store/use-auth-store';
import { cartServices } from '../../services/cart.service';
import useCartStore from '../../store/use-cart-store';

function Cart() {
    const { user } = useAuthStore();
    const { cart } = useCartStore();
    const fetchCartItems = useCartStore((state) => state.fetchCartItems);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const [totalPayment, setTotalPayment] = useState(0);

    const handleCheckOut = async () => {
        if (!cart || cart.length === 0) {
            alert('Your cart is empty. Please add items to checkout.');
            return;
        }

        // Prepare the order items
        const orderItems = cart.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
        }));

        // Prepare the request body
        const orderData = {
            totalAmount: totalPayment,
            shippingCost: 25000, // Assuming a fixed shipping cost
            address: "Địa chỉ đại đại đi", // Replace with actual address if available
            userId: user.userId, // Get the user ID from the auth store
            orderItems: orderItems,
        };

        try {
            const response = await orderServices.createOrder(orderData);
            console.log(response);

            await removeItemsFromCart(cart);
            alert('Order created successfully!');
        } catch (error) {
            console.error("Failed to create order:", error);
            alert('Failed to create order. Please try again.');
        }
    };

    const removeItemsFromCart = async (items) => {
        // Remove items from the server
        await Promise.all(items.map((item) => cartServices.removeFromCartServer(item.id)));
        // Update cart locally
        items.forEach((item) => removeFromCart(item.id));
        // Refresh the cart items
        await fetchCartItems(user.userId);
    };

    return (
        <div className='w-full'>
            <div className="w-9/12 mx-auto bg-blue-50 py-5">
                <div className="flex">
                    <div className="w-2/3 pr-4">
                        {/* Bảng các sản phẩm trong giỏ hàng */}
                        <DataTable setTotalPayment={setTotalPayment} />
                    </div>

                    <div className="w-1/3 px-8 py-10">
                        <div className="p-4 bg-white mt-4">
                            {/* Hiển thị tổng số tiền sẽ phải thanh toán */}
                            <div className="flex justify-between py-4">
                                <div className="">Total Payment</div>
                                <div className="">{Number(totalPayment).toLocaleString()}đ</div>
                            </div>

                            {/* Nút thực hiện thanh toán */}
                            <button onClick={handleCheckOut} className='w-full py-2 bg-black rounded text-white'>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;

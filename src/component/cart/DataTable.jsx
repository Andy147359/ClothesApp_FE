import { useEffect } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Table } from 'antd';
import { cartServices } from '../../services/cart.service';
import useAuthStore from '../../store/use-auth-store';
import useCartStore from '../../store/use-cart-store';

const DataTable = ({ setTotalPayment }) => {
    const { user } = useAuthStore();
    const { cart } = useCartStore();
    const fetchCartItems = useCartStore((state) => state.fetchCartItems);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    useEffect(() => {
        if (!user) return;
        fetchCartItems(user?.userId);
    }, []);

    useEffect(() => {
        if (!cart || !cart.length) {
            setTotalPayment(0);
            return;
        }

        const total = cart.reduce((sum, item) => {
            return sum + parseFloat(item?.product?.price) * item.quantity;
        }, 0);

        setTotalPayment(total.toFixed(0));
    }, [cart]);

    const handleRemoveCart = (id) => {
        cartServices.removeFromCartServer(id)
            .then(() => {
                fetchCartItems(user.userId);
            })
            .catch((error) => {
                console.error("Failed to remove item from cart:", error);
            });
        removeFromCart(id);
    }

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return;

        cartServices.updateCartItemQuantityServer(user.userId, id, newQuantity)
            .then(() => {
                fetchCartItems(user.userId);
            })
            .catch((error) => {
                console.error("Failed to update item quantity:", error);
            });
    };

    const columns = [
        {
            title: 'Product',
            dataIndex: 'product',
            width: 320,
            render: (_, record) => (
                <div className="flex">
                    <img src={record.imageUrl} className="w-[50px] h-[50px] rounded-lg" alt="product" />
                    <div className="ms-5">
                        <h1>{record.name}</h1>
                    </div>
                </div>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (_, record) => `${record.price.toLocaleString()}đ`,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (_, record) => (
                <div className="flex">
                    <button
                        className='outline outline-1 px-2 rounded'
                        onClick={() => handleQuantityChange(record.id, record.quantity - 1)}
                    >
                        -
                    </button>
                    <div className="mx-2">{record.quantity}</div>
                    <button
                        className='outline outline-1 px-2 rounded'
                        onClick={() => handleQuantityChange(record.id, record.quantity + 1)}
                    >
                        +
                    </button>
                </div>
            ),
        },
        {
            title: 'Total',
            dataIndex: 'total',
            render: (_, record) => `${(record.price * record.quantity).toLocaleString()}đ`,
        },
        {
            title: <RiDeleteBin6Line className='text-red-700 font-bold' />,
            dataIndex: '',
            render: (_, record) => (
                <div>
                    <RiDeleteBin6Line onClick={() => handleRemoveCart(record.id)} className='text-red-600' />
                </div>
            ),
        }
    ];

    const dataSource = cart && cart.map((item, index) => ({
        key: index,
        id: item.id,
        name: item?.product?.name,
        price: parseFloat(item?.product?.price),
        quantity: item?.quantity,
        total: (parseFloat(item?.product?.price) * item?.quantity).toFixed(0),
        imageUrl: item?.product?.imageUrl,
    }));

    return (
        <div className="ms-5">
            <Table
                columns={columns}
                dataSource={dataSource}
            />
        </div>
    );
};

export default DataTable;

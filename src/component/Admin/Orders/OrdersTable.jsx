import { Table, Button, Select } from "antd";
import { useEffect, useState } from "react";
import AdminOrderDetails from "./AdminOrderDetails";
import { orderServices } from "../../../services/order.service";
import useAuthStore from "../../../store/use-auth-store";

function OrdersTable() {
    const { user } = useAuthStore();
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        const getAllOrders = async () => {
            try {
                const allOrders = await orderServices.getAllOrders();
                setOrders(allOrders);
                setFilteredOrders(allOrders); // Initialize filtered orders
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };
        getAllOrders();
    }, [orders]);

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center', // Center-align content
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            align: 'center', // Center-align content
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center', // Center-align content
            render: (_, record) => (
                <Select
                    defaultValue={record.status}
                    style={{ width: 120 }}
                    onChange={(value) => handleStatusChange(record.id, value)}
                    disabled={record.status === "Completed"}
                >
                    <Select.Option value="Pending">Pending</Select.Option>
                    <Select.Option value="Completed">Completed</Select.Option>
                </Select>
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'center', // Center-align content
            render: (_, record) => (
                <Button type="link" onClick={() => handleAction(record.id)}>
                    View Details
                </Button>
            ),
        },
    ];

    const handleStatusChange = async (orderId, status) => {
        console.log(status);
        try {
            await orderServices.updateOrderStatus(orderId);
            const updatedOrders = orders.map(order => {
                if (order.id === orderId) {
                    return { ...order, status };
                }
                return order;
            });
            setOrders(updatedOrders);
            setFilteredOrders(updatedOrders);
        } catch (error) {
            console.error('Failed to update order status:', error);
        }
    };

    const dataSource = filteredOrders.map(order => ({
        key: order.id,
        id: order.id,
        name: order.orderItems[0].product.name,
        totalAmount: `${order.totalAmount.toLocaleString()}đ`,
        status: order.status,
        imageUrl: order.orderItems[0].product.imageUrl,
    }));

    const handleAction = (orderId) => {
        setSelectedOrderId(orderId);
        setOpen(true);
    };

    return (
        <div>
            {/* Table */}
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 10 }}
                bordered
            />

            {/* Order Details Modal */}
            {open && (
                <AdminOrderDetails setOpen={setOpen} orderId={selectedOrderId} onClose={() => setOpen(false)} />
            )}
        </div>
    );
}

export default OrdersTable;
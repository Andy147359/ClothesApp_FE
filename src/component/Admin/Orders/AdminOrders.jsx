import OrdersTable from "./OrdersTable.jsx"

function AdminOrders() {
    return (
        <div className="w-4/5 m-8">
            <h3 className="text-[22px] font-Poppins pb-2">Orders Management</h3>
            <OrdersTable />
        </div>
    )
}

export default AdminOrders

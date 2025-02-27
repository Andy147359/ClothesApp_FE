
import AdminSideBar from '../../component/Admin/AdminSideBar';
import AdminOrders from '../../component/Admin/Orders/AdminOrders';

function AllOrdersPage() {
  return (
    <div className="flex">
      <AdminSideBar active={2} />
      <AdminOrders />
    </div>
  )
}

export default AllOrdersPage

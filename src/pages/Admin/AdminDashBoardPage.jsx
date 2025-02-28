import { useEffect } from "react";
import useProductStore from "../../store/use-product-store";
import AdminContent from "../../component/Admin/Analytic/AdminContent"
import AdminSideBar from "../../component/Admin/AdminSideBar";

function AdminDashBoardPage() {
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex">
      <AdminSideBar active={1} />
      <AdminContent />
    </div>
  )
}

export default AdminDashBoardPage

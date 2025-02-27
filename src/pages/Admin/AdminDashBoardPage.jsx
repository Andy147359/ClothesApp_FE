import { useEffect } from "react";
import AdminDashBoard from "../../component/Admin/AdminDashBoard"
import useProductStore from "../../store/use-product-store";

function AdminDashBoardPage() {
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AdminDashBoard />
  )
}

export default AdminDashBoardPage

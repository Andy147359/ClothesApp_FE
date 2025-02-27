
import { useEffect } from 'react';
import AdminSideBar from '../../component/Admin/AdminSideBar';
import AllProducts from '../../component/Admin/Product/AllProducts';
import useProductStore from '../../store/use-product-store';

function AllProductsPage() {
    const fetchProducts = useProductStore((state) => state.fetchProducts);

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="flex">
            <AdminSideBar active={3} />
            <AllProducts products />
        </div>
    )
}

export default AllProductsPage

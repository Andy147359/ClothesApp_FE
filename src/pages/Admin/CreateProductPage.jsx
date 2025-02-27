
import CreateProduct from './../../component/Admin/Product/CreateProduct';
import AdminSideBar from './../../component/Admin/AdminSideBar';
function CreateProductPage() {
    return (
        <div className="flex">
            <AdminSideBar active={4} />
            <CreateProduct />
        </div>
    )
}

export default CreateProductPage

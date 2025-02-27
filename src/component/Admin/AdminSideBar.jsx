import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiPackage, FiShoppingBag, FiArrowLeft } from "react-icons/fi";
import { AiOutlineFolderAdd } from "react-icons/ai";

function AdminSideBar({ active }) {
    return (
        <div className="w-1/6 border h-screen">
            {/* Nút đến trang thống kê Dashboard */}
            <div className="w-full flex items-center p-4">
                <Link to="/admin" className="w-full flex items-center">
                    <RxDashboard size={30} color={`${active == 1 ? "red" : "#555"}`} />
                    <h5 className={`800px:block pl-2 text-[18px] font-[400] ${active == 1 ? "text-red-600" : "text-[#555]"}`}>
                        Dashboard
                    </h5>
                </Link>
            </div>

            {/* Nút đến trang tất cả đơn hàng */}
            <div className="w-full flex items-center p-4">
                <Link to="/admin/orders" className="w-full flex items-center">
                    <FiShoppingBag size={30} color={`${active === 2 ? "red" : "#555"}`} />
                    <h5 className={`800px:block pl-2 text-[18px] font-[400] ${active === 2 ? "text-red-600" : "text-[#555]"}`}>
                        All Orders
                    </h5>
                </Link>
            </div>

            {/* Nút đến trang tất cả sản phẩm */}
            <div className="w-full flex items-center p-4">
                <Link to="/admin/product" className="w-full flex items-center">
                    <FiPackage size={30} color={`${active === 3 ? "red" : "#555"}`} />
                    <h5 className={`800px:block pl-2 text-[18px] font-[400] ${active === 3 ? "text-red-600" : "text-[#555]"}`}>
                        All Products
                    </h5>
                </Link>
            </div>

            {/* Nút đến trang tạo sản phẩm mới */}
            <div className="w-full flex items-center p-4">
                <Link to="/admin/create-product" className="w-full flex items-center">
                    <AiOutlineFolderAdd size={30} color={`${active === 4 ? "red" : "#555"}`} />
                    <h5 className={`800px:block pl-2 text-[18px] font-[400] ${active === 4 ? "text-red-600" : "text-[#555]"}`}>
                        Create Product
                    </h5>
                </Link>
            </div>

            {/* Nút Back to Home */}
            <div className="w-full flex items-center p-4">
                <Link to="/" className="w-full flex items-center hover:text-red-600 transition">
                    <FiArrowLeft size={30} color="#555" />
                    <h5 className="800px:block pl-2 text-[18px] font-[400] text-[#555]">
                        Back to Home
                    </h5>
                </Link>
            </div>
        </div>
    );
}

export default AdminSideBar;

import { useRef, useState } from 'react'
import { FaBasketShopping } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import { MdManageAccounts } from "react-icons/md";
import useProductStore from '../../store/use-product-store';
import useCartStore from '../../store/use-cart-store';
import { FaTimes } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import useAuthStore from '../../store/use-auth-store';

function Header() {
    const logout = useAuthStore((state) => state.logout);

    const { cart } = useCartStore();
    const { products } = useProductStore();
    const navigate = useNavigate();
    const inputSearchRef = useRef(null);
    const { user } = useAuthStore();

    const [searchData, setSearchData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleClearSearch = () => {
        console.log("Clear search");
        setSearchQuery("");
        setSearchData(null);
    };

    return (
        <div className=" bg-black flex">
            <div className='w-10/12 mx-auto text-white flex items-center h-[90px]'>
                {/* Logo Shop*/}
                <div className="w-1/3 flex items-center">
                    <div className="">
                        <img onClick={() => navigate("/")} className='h-[64px]' src="https://cdn.kiotvietweb.vn/merchant/1fb4ae1f6d40d69dfa13e50dcfeb6e6c/other/1725866622/OUTLETTRANG.png" alt="" />
                    </div>
                </div>

                {/* Nội dung bên phải */}
                <div className="w-1/3 flex justify-end items-center">
                    {/* Input tìm kiếm*/}
                    <div className="relative w-full mr-5">
                        <input
                            ref={inputSearchRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setSearchData(
                                    products.filter((i) =>
                                        i.name.toLowerCase().includes(e.target.value.toLowerCase())
                                    )
                                );
                            }}
                            placeholder="Search Product..."
                            className="h-[40px] w-full px-2 border-[2px] rounded-md text-black"
                        />


                        {/* Dấu "X" để xóa tìm kiếm */}
                        <div onClick={handleClearSearch}>
                            <FaTimes
                                size={18}
                                color="gray"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            />
                        </div>

                        {/* Dữ liệu tìm kiếm */}
                        {searchData && (
                            <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                                {searchData.map((i) => {
                                    return (
                                        <Link to={`/product/${i.id}`} key={i.id}>
                                            <div className="flex items-center mb-2">
                                                <img
                                                    src={i.imageUrl}
                                                    alt=""
                                                    className="w-[50px] mr-2"
                                                />
                                                <h5 className='text-black'>{i.name}</h5>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-1/3 flex justify-end items-center">
                    {/* Nút giỏ hàng */}
                    <Link to="/cart">
                        <div className="relative">
                            <FaBasketShopping size={24} className='mr-8' />
                            <span className="absolute right-6 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                {cart.length}
                            </span>
                        </div>
                    </Link>

                    {/* Nếu đăng nhập tài khoản ADMIN thì sẽ hiện nút này */}
                    {user && user.role === 'ADMIN' && (
                        <Link to="/admin" className="mx-5">
                            <MdManageAccounts size={28} />
                        </Link>
                    )}

                    {/* Nếu login rồi thì hiển thị tên người dùng */}
                    {/* Nếu chưa login thì hiển thị nút login*/}
                    {user ?
                        (<div className='cursor-pointer flex'>
                            <p className='uppercase font-extrabold text-white mr-5'>{user.fullName}</p>
                            <Link to="/login" className="text-white" onClick={logout}>
                                <FiLogOut size={20} />
                            </Link>
                        </div>)
                        :
                        (<Link to={"/login"} className="ms-5 uppercase font-bold">
                            Login now
                        </Link>)
                    }
                </div>
            </div>
        </div >
    )
}

export default Header

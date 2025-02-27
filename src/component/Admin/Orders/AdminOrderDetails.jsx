import { FaTimes } from 'react-icons/fa'; // Import biểu tượng "X" từ react-icons

function AdminOrderDetails({ setOpen }) {
    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
            <div className="w-[80%] 800px:w-[50%] h-[80vh] bg-white rounded-md shadow p-4 overflow-y-scroll relative">
                {/* Dấu X đóng modal */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
                >
                    <FaTimes />
                </button>
                {/* Nội dung modal */}
                <div>Order Details</div>
            </div>
        </div>
    )
}

export default AdminOrderDetails;

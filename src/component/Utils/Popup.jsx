
const Popup = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
            <div className="w-[60%]  h-[80vh] bg-white rounded-md shadow p-4 overflow-y-scroll">
                <button
                    onClick={onClose}
                    className="text-2xl float-right top-4 right-4 text-black  font-medium"
                >
                    X
                </button>
                {children}
            </div>
        </div>
    );
};

export default Popup;

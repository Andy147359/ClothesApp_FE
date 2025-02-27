import AdminContent from "./AdminContent"
import AdminSideBar from "./AdminSideBar"

function AdminDashBoard() {
    return (
        <div>
            <div className="flex">
                <AdminSideBar active={1} />
                <AdminContent />
            </div>
        </div>
    )
}

export default AdminDashBoard

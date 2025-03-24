import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/use-auth-store";
import { authServices } from "../../services/auth.service";

const Signup = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const response = await authServices.register(email, name, password);
            if (response.status === 201) {
                alert("Signup success");
                navigate("/login");
            }
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                    {/* Ô nhập tên đầy đủ */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="w-full p-2 border rounded"
                        required
                    />

                    {/* Ô nhập email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        required
                    />

                    {/* Ô nhập mật khẩu */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                        required
                    />

                    {/* Nút đăng ký */}
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                        Submit
                    </button>
                </form>

                {/* Nút chuyển sang trang đăng nhập */}
                <p className="text-center mt-2">
                    Already have an account? <Link to="/login" className="text-blue-600">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;

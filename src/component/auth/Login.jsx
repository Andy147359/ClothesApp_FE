import { Link, useNavigate } from "react-router-dom";
import { authServices } from "../../services/auth.service";
import useAuthStore from "../../store/use-auth-store";

const Login = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const response = await authServices.login(email, password);
            if (response.status === 200) {
                login(response.data);
                navigate("/");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                        Submit
                    </button>
                </form>
                <p className="text-center mt-2">
                    Not have an account? <Link to="/sign-up" className="text-blue-600">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

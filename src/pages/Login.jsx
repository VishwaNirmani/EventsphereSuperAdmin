import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const handleBtnClick = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await loginUser(email, password);
        setIsLoading(false);
        if (res.success) {
            navigate("/");
        } else {
            setErrorMessage(res.message);
        }

    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">

            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-custom-purple tracking-tight">
                    EventSphere
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                    Discover and book the best events near you
                </p>
            </div>

            <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Super Admin Login</h2>

                <form className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block mb-1 text-gray-600">Username</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-purple"
                            placeholder="your_username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-purple"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`flex justify-center items-center gap-2 w-full text-white font-semibold py-2 rounded-lg transition ${isLoading ? 'bg-custom-purple-lock' : 'hover:bg-custom-purple-lock bg-custom-purple'}`}
                        onClick={handleBtnClick}
                    >
                        {
                            isLoading ?

                                <svg aria-hidden="true" className="w-5 text-gray-200 animate-spin fill-custom-purple-lock" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg> : <></>
                        }
                        {
                            isLoading ? "Signing In" : "Sign In"
                        }
                    </button>
                </form>

                <p className="mt-4 text-sm text-gray-500">
                    Don’t have an account? <Link to="/register" className="text-custom-purple hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
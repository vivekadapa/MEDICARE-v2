import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "universal-cookie";
import { useAuth } from "../AuthContext";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const cookies = new Cookies();
    const { user, setUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateEmail = (value) => {
        const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;

        if (!emailRegex.test(value)) {
            setEmailError(
                "Please enter a valid email address (e.g  jonh@gmail.com)"
            );
            return false;
        } else {
            setEmailError("");
            return true;
        }
    };

    const validatePassword = () => {
        const isValidPassword =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
                password
            );

        if (!isValidPassword) {
            setPasswordError(
                "Password must contain at least 6 characters with one uppercase letter, one number, and one special character."
            );
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    const handleEmailChange = (e) => {
        const { value } = e.target;
        setEmail(value);
        validateEmail(value);
    };

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setPassword(value);
        validatePassword(value);
    };

    const loginUser = async () => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword();

        if (!isEmailValid || !isPasswordValid) {
            toast.error("Please fix the validation errors before submitting.");
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
                {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await response.json();

            if (data.success) {
                cookies.set("TOKEN", data.token, {
                    path: "/",
                });
                setUser(data.user);

                if (data.user.role === "patient") {
                    navigate("/", { replace: true, state: data.user });
                } else if (data.user.role === "doctor") {
                    navigate("/doctordashboard", {
                        replace: true,
                        state: data.user,
                    });
                } else {
                    navigate("/admin-dashboard", {
                        replace: true,
                        state: data.user,
                    });
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error: ", error.message);
        }
    };

    return (
        <div className="h-full w-full flex items-center justify-center min-h-[85vh]">
            <div className="flex flex-row p-10 rounded-md shadow-2xl">
                <div className="bg-teal-700 p-6 shadow-lg flex items-center justify-center flex-col w-[32rem] rounded-l-md">
                    <h1 className="text-white font-medium text-3xl">
                        Welcome Back!
                    </h1>
                    <h3 className="text-white text-lg mt-4 w-[24rem]">
                        We are so very happy to have you here. It is great to
                        see you again. We hope you had a safe and enjoyable time
                        away.
                    </h3>
                </div>

                <section className="grid place-items-center bg-zinc-200 rounded-r-md">
                    <form
                        method="post"
                        className="p-6 bg-base-100 shadow-lg flex flex-col gap-y-4 bg-opacity-40 w-[26rem] min-h-[60vh]"
                    >
                        <h4 className="text-center text-3xl font-bold text-teal-800">
                            Login
                        </h4>
                        <div className="flex items-center border-b-2 border-teal-500 py-2">
                            <FaEnvelope className="text-teal-500 mr-2" />
                            <input
                                className={`px-4 py-3 focus:border-teal-400 focus:outline-none border-none focus:ring-1 focus:ring-teal-600 rounded-md flex-1 ${
                                    emailError ? "border-red-500" : ""
                                }`}
                                placeholder="Email"
                                type="email"
                                name="identifier"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        {emailError && (
                            <p className="text-red-500 text-sm mt-1">
                                {emailError}
                            </p>
                        )}

                        <div className="flex items-center border-b-2 border-teal-500 py-2 relative">
                            <FaLock className="text-teal-500 mr-2" />
                            <input
                                className={`px-4 py-3 focus:border-teal-400 focus:outline-none border-none focus:ring-1 focus:ring-teal-600 rounded-md flex-1 ${
                                    passwordError ? "border-red-500" : ""
                                }`}
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            {showPassword ? (
                                <FaEyeSlash
                                    className="text-teal-500 cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <FaEye
                                    className="text-teal-500 cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                                    onClick={() => setShowPassword(true)}
                                />
                            )}
                        </div>
                        {passwordError && (
                            <p className="text-red-500 text-sm mt-1">
                                {passwordError}
                            </p>
                        )}
                        <div className="mt-4">
                            <button
                                className="px-4 py-3 w-full text-white rounded-md bg-teal-600"
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    loginUser();
                                }}
                            >
                                Login
                            </button>
                        </div>

                        <p className="text-center">
                            Not a member yet?{" "}
                            <Link
                                to="/register"
                                className="ml-2 link link-hover link-primary capitalize"
                            >
                                Register
                            </Link>
                        </p>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Login;
